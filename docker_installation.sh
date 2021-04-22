GREEN='\033[0;32m'

echo -e "${GREEN}____ Uninstall old versions"
sudo apt-get remove docker docker-engine docker.io containerd runc

echo -e "${GREEN}____ Update list of local packages"
sudo apt update

# Next, install a few prerequisite packages which let apt use packages over HTTPS
echo -e "${GREEN}____ Download Dependencies"
sudo apt install apt-transport-https ca-certificates curl software-properties-common

# Then add the GPG key for the official Docker repository to your system
echo -e "${GREEN}____ Add Docker’s GPG Key"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

# Add the Docker repository to APT sources
echo -e "${GREEN}____ Install the Docker Repository"
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"


# Next, update the package database with the Docker packages from the newly added repo
echo -e "${GREEN}____ Update Repositories"
sudo apt update

# Make sure you are about to install from the Docker repo instead of the default Ubuntu repo
echo -e "${GREEN}____ Install Latest Version of Docker"
apt-cache policy docker-ce
sudo apt install docker-ce

echo -e "${GREEN}____ Installing Docker Compose"
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

# Next, set the correct permissions so that the docker-compose command is executable
sudo chmod +x /usr/local/bin/docker-compose

# If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group

echo -e "${GREEN}____ Add permission for the current user"
sudo usermod -aG docker ${USER}

# To apply the new group membership, log out of the server and back in, or type the following
su - ${USER}

# You will be prompted to enter your user’s password to continue. Confirm that your user is now added to the docker group by typing
id -nG

# Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running
echo -e "${GREEN}____ Check if docker is running"
sudo systemctl status docker