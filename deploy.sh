yarn build
# Todo: deploy to staging be default, special flag for production
# Use this example: http://mywiki.wooledge.org/BashFAQ/035
rsync -avzP --exclude 'videos/uncompressed' /Users/bryant/Sites/totf/build/ billybobjobo@billybobjobo.webfactional.com:webapps/theonetruefaith/