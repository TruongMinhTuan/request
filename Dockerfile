#FROM armv7/armhf-ubuntu

#FROM armv7/armhf-debian
FROM resin/rpi-raspbian:latest
#FROM keithf/ubuntu-16.04-armhf

FROM resin/rpi-raspbian:latest
RUN apt-get update
RUN apt-get install wget
#install node npm
RUN apt-get install bzip2
RUN wget https://nodejs.org/dist/v6.5.0/node-v6.5.0-linux-armv6l.tar.xz \
&& tar -xvf node-v6.5.0-linux-armv6l.tar.xz \
&& cd node-v6.5.0-linux-armv6l \
&& cp -R bin/ /usr/local/ \
&& cp -R include /usr/local/ \
&& cp -R lib/ /usr/local/ \
&& cp -R share/ /usr/local/ \
&& cd ..
RUN rm node-v6.5.0-linux-armv6l.tar.xz
RUN rm -rf node-v6.5.0-linux-armv6l
RUN node -v && npm -v

#add voice
RUN apt-get install festival festlex-cmu -y
RUN mkdir cmu_tmp \
&& cd cmu_tmp/ \
&& wget -c http://www.speech.cs.cmu.edu/cmu_arctic/packed/cmu_us_bdl_arctic-0.95-release.tar.bz2 \
&& wget -c http://www.speech.cs.cmu.edu/cmu_arctic/packed/cmu_us_clb_arctic-0.95-release.tar.bz2 \
&& for t in `ls cmu_*` ; do tar xf $t ; done \
&& rm *.bz2 \
&& mkdir -p /usr/share/festival/voices/english/ \
&& mv * /usr/share/festival/voices/english/
RUN cd /usr/share/festival/voices/english \
&& mv "/usr/share/festival/voices/english/cmu_us_bdl_arctic" "/usr/share/festival/voices/english/cmu_us_bdl_arctic_clunits"\
&& mv "/usr/share/festival/voices/english/cmu_us_clb_arctic" "/usr/share/festival/voices/english/cmu_us_clb_arctic_clunits"

RUN for d in `ls /usr/share/festival/voices` ; do ls "/usr/share/festival/voices/${d}" ; done

WORKDIR /usr/src/app
COPY package.json .
RUN npm install

RUN npm install pm2@latest -g --unsafe-perm
RUN pm2 install pm2-auto-pull

COPY . .
RUN apt-get install git
RUN pm2 deploy ecosystem.config.js production

EXPOSE 8080

CMD ["pm2 start ./server.js"]