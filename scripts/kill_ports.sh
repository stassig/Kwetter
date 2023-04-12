#!/bin/bash

# Move up one directory
cd ..

# Loop over each line in .env.local.example
while read -r line; do
  # Get the port number after "localhost:"
  port=${line#*localhost:}

  # If there is a port number, run the kill command
  if [[ -n "$port" ]]; then
    sudo kill -9 $(sudo lsof -t -i:"$port")
  fi
done < .env.local.example