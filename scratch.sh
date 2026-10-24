#!/usr/bin/env bash

git clone https://github.com/TurboWarp/scratch-gui
cd ./scratch-gui || exit 1
  git apply ../scratch.patch
  npm ci --allow-git=all
  NODE_ENV=production ROOT=/tw/ npm run build
cd ..

rm -r ./public/tw
mkdir -p ./public/tw
cp -r ./scratch-gui/build/* ./public/tw/
rm -rf ./scratch-gui
