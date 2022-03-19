# Observers - Forum for programmers

To run this project, you need to clone the repository and install 
[Docker Desktop](https://www.docker.com/products/docker-desktop/).

Now you need to change your `hosts` file to make Imgur API work properly. If you are using Windows, go to 
`C:\Windows\System32\drivers\etc`, and if you are using Linux, go to `/etc/`. Then open or create file `hosts` and type:

Windows:

* `127.0.0.1 observers`
* `dnscmd /RecordAdd observers * 3600 A 127.0.0.1`

Linux (this may not work, I have no possibility to test it right now):

* `127.0.0.1   observers localhost`
* Open `/etc/hostname`
* Type `observers`

After that, you have to set environment variables in `docker-compose.yml`:

* `SECRET_KEY: YOUR_SECRET_KEY`
* `REACT_APP_CLIENT_ID: YOUR_IMGUR_API_KEY`
* `REACT_APP_LOCAL_NETWORK_IP: YOUR_LOCAL_NETWORK_IP`

Now you are ready to go. Go to project directory in terminal and run:

`docker-compose up -d --build`

Wait for the build to complete and go to [http://observers:3000/](http://observers:3000/).