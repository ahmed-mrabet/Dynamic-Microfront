FROM node

WORKDIR /app

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -O- "https://keyserver.ubuntu.com/pks/lookup?fingerprint=on&op=get&search=0x6125E2A8C77F2818FB7BD15B93C4A3FD7BB9C367" | gpg --dearmour -o /usr/share/keyrings/ansible-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/ansible-archive-keyring.gpg] http://ppa.launchpad.net/ansible/ansible/ubuntu jammy main" | tee /etc/apt/sources.list.d/ansible.list \
    && apt-get update \
    && apt-get install -y ansible \
    && rm -rf /var/lib/apt/lists/* \
    && ansible-galaxy collection install community.kubernetes

COPY package*.json ./
RUN npm install
RUN curl -fsSL -o get_helm.sh https://raw.githubusercontent.com/helm/helm/master/scripts/get-helm-3 && \
    chmod 700 get_helm.sh && \
    ./get_helm.sh && \
    rm -f get_helm.sh

COPY . .

EXPOSE 3001

CMD ["node", "server.js"]