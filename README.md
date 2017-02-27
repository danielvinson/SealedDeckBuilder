# SealedDeckBuilder

Dev install instructions:

Install `python`, `pip`, `npm`.

Install Heroku CLI from https://devcenter.heroku.com/articles/heroku-cli

Clone the repo

```
pip install -r requirements.txt
npm install
```

Example setup on my Ubuntu AWS instance:

sudo apt-get install python-pip python-dev build-essential

Heroku CLI setup:

```
sudo apt-get install software-properties-common # debian only

sudo add-apt-repository "deb https://cli-assets.heroku.com/branches/stable/apt ./"

curl -L https://cli-assets.heroku.com/apt/release.key | sudo apt-key add -

sudo apt-get update

sudo apt-get install heroku
```


( Add my keys to GitHub )

```
sudo git clone git@github.com:danielvinson/SealedDeckBuilder.git

sudo pip install -r requirements.txt

sudo npm install -g webpack

sudo npm install

sudo webpack
```


To run the dev server: `sudo heroku local -e .env.local dev`
(To test a production build, run `sudo heroku local -e .env web`)

Then `open localhost:5000`
