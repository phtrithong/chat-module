GREEN='\033[0;32m'

echo -e "${GREEN}____ Update system"
sudo apt update
sudo apt -y upgrade

echo -e "${GREEN}____ Add Node.js APT Repository"
sudo apt update
sudo apt -y install curl dirmngr apt-transport-https lsb-release ca-certificates
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

echo -e "${GREEN}____ Install Node.js"
sudo apt -y install nodejs

echo -e "${GREEN}____ Check Node.js and NPM version"
node --version
npm --version
