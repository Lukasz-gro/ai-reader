#! /usr/bin/env bash

mkdir -p ./docs

tsuml2 \
  -g 'src/**/*.{ts,tsx}' \
  --modifiers false \
  --propertyTypes false \
  --memberAssociations \
  --outMermaidDsl docs/class.mmd \
  --outFile /dev/null \ &&
mmdc \
  --configFile mermaid-config.json \
  -i docs/class.mmd \
  -o docs/class.svg
