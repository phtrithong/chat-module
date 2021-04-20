echo "First, update your existing list of packages:"
sudo apt update

echo "Next, install a few prerequisite packages which let apt use packages over HTTPS:"
sudo apt install apt-transport-https ca-certificates curl software-properties-common

echo "Then add the GPG key for the official Docker repository to your system:"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -

echo "Add the Docker repository to APT sources:"
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu focal stable"

echo "Next, update the package database with the Docker packages from the newly added repo:"
sudo apt update

echo "Make sure you are about to install from the Docker repo instead of the default Ubuntu repo:"
apt-cache policy docker-ce

echo "Finally, install Docker:"
sudo apt install docker-ce

echo "Docker should now be installed, the daemon started, and the process enabled to start on boot. Check that it’s running:"
sudo systemctl status docker

echo "If you want to avoid typing sudo whenever you run the docker command, add your username to the docker group:"
sudo usermod -aG docker ${USER}

echo "To apply the new group membership, log out of the server and back in, or type the following:"
su - ${USER}

echo "You will be prompted to enter your user’s password to continue.
Confirm that your user is now added to the docker group by typing:"
id -nG

echo "Installing Docker Compose"
sudo curl -L "https://github.com/docker/compose/releases/download/1.27.4/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose

echo "Next, set the correct permissions so that the docker-compose command is executable:"
sudo chmod +x /usr/local/bin/docker-compose