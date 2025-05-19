#!/bin/bash
clear
npm run build-app
rm -r resources
node --max_old_space_size=10000 dist/index.js
