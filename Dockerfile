FROM ubuntu:16.04

RUN apt-get update 
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_8.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install nodejs -y
RUN apt-get install festival festlex-cmu -y
#add voice
RUN apt-get install wget
RUN apt-get install bzip2
RUN mkdir cmu_tmp && cd cmu_tmp/ && wget -c http://www.speech.cs.cmu.edu/cmu_arctic/packed/cmu_us_bdl_arctic-0.95-release.tar.bz2 && wget -c http://www.speech.cs.cmu.edu/cmu_arctic/packed/cmu_us_clb_arctic-0.95-release.tar.bz2 && for t in `ls cmu_*` ; do tar xf $t ; done && rm *.bz2 && mkdir -p /usr/share/festival/voices/english/ && mv * /usr/share/festival/voices/english/ 
RUN cd /usr/share/festival/voices/english && mv "/usr/share/festival/voices/english/cmu_us_bdl_arctic" "/usr/share/festival/voices/english/cmu_us_bdl_arctic_clunits" && mv "/usr/share/festival/voices/english/cmu_us_clb_arctic" "/usr/share/festival/voices/english/cmu_us_clb_arctic_clunits"

RUN for d in `ls /usr/share/festival/voices` ; do ls "/usr/share/festival/voices/${d}" ; done
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 8080

CMD ["npm", "start"]
