pnpm run build
ssh workplace 'cd /home/lyc/vivid && rm -rf *'
cd dist && scp -r * workplace:/home/lyc/vivid
