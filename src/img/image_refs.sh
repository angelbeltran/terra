# The webpage(s) to find the player boards
# https://boardgamegeek.com/image/<image number>/terra-mystica

# Sizes, from smallest to largest:
# Image         | sq (square) | t (small) | md (medium) | lg (large)  | '' (original) 
#---------------------------------------------------------------------------
# Cover         | 75x75       | 106x150   | 355x500     | 727x1024    | 2598x3661
# Board         | 75x75       | 200x135   | 500x338     | 1024x692    | 2400x1622
# Board, Fire & Ice | 75x75   | 200x133   | 500x333     |             | 751x500
# Board, tabletopia | 75x75   | 200x134   | 500x334     | 1024x685    | 1370x916
# Cult Track    | 75x75       | 96x150    | 322x500     | 659x1024    | 1029x1600
# Bonus Scrolls | 75x75       | 143x150   | 476x500     | 975x1024    | 2181x2291
# Alchemists    | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Auren         | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Chaos magicians | 75x75     | 200x129   | 500x321     | 1024x658    | 3307x2126
# Cultists      | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Darklings     | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Dwarfs        | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Engineers     | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Fakirs        | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Giants        | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Halflings     | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Mermaids      | 75x75       | 200x129   | 500x322     | 1024x658    | 3317x2133
# Nomads        | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Swarmlings    | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126
# Witches       | 75x75       | 200x129   | 500x321     | 1024x658    | 3307x2126

# The endpoint to GET all images from
API=https://cf.geekdo-images.com/images/ #pic<image number>_<file size>.<file extension

# Image numbers & file types
cover=1356616           #.jpg
board=1346885           #.jpg
board_fire_ice=2071235  #.jpg
board_tabletopia=3462472  #.jpg
cult_track=1347066      #.jpg
bonus_scrolls=1351064   #.jpg
alchemists=1442352      #.jpg
auren=1396991           #.jpg
chaos_magicians=1407080 #.jpg
cultists=1443232        #.jpg
darklings=1395280       #.jpg
dwarfs=1401734          #.jpg
engineers=1422543       #.jpg
fakirs=1411990          #.jpg
giants=1435190          #.jpg
halflings=1410489       #.jpg
mermaids=1346255        #.png <-- German board!
nomads=1394712          #.jpg
swarmlings=1394603      #.jpg
witches=1420018         #.jpg

for name in cover board cult_track bonus_scrolls alchemists auren chaos_magicians cultists darklings dwarfs engineers fakirs giants halflings mermaids nomads swarmlings witches; do
  image_number=$(eval "echo \$$name")
  file_extension=jpg
  if [ "$name" = "mermaids" ]; then
    file_extension=png
  fi

  echo "Downloading images for $name..."
  for file_size in sq t md lg; do
    file_name="$name"_"$file_size"."$file_extension"
    #echo "$API"pic"$image_number"_"$file_size"."$file_extension"
    curl -# "$API"pic"$image_number"_"$file_size"."$file_extension" > "$file_name"
    echo "Downloaded $file_name"
  done
  file_name="$name"."$file_extension" # for original size
  #echo "$API"pic"$image_number"."$file_extension"
  curl -# "$API"pic"$image_number"."$file_extension" > "$file_name"
  echo "Downloaded $file_name"
  echo
done
