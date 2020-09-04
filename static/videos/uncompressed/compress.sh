# for fname in *.mp4
#   do
#   echo "STARTING ON $fname..."
#   ffmpeg -y -i "$fname" \
#     -s 640x480 \
#     -b:v 700k \
#     -an \
#     -ss 00:00:00 -t 00:00:03 -async 1 \
#     "../mobile/$fname"
#   echo "DONE WITH $fname"
# done

for fname in *.mp4
  do
  echo "STARTING ON $fname..."
  ffmpeg -y -i "$fname" \
    -s 1280x720 \
    -an \
    -ss 00:00:00 -t 00:00:05 -async 1 \
    "../$fname"
  echo "DONE WITH $fname"
done

# ffmpeg -y -i "$fname" \
#   -vcodec h264 \ <-- The compression codec
#   -s 640x480 \ <-- New size
#   -b:v 1000k \ <-- New bitrate
#   -an \ <-- Kill audio
#   -ss 00:00:00 -t 00:00:03 -async 1 \ <-- Take first 3 sec
#   "../dist/$fname"