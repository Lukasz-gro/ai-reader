#! /usr/bin/env bash

tsuml2 \
  -g 'src/**/*.{ts,tsx}' \
  --modifiers false \
  --propertyTypes false \
  --memberAssociations \
  --outMermaidDsl docs/class.mmd && \
mmdc \
  --configFile mermaid-config.json \
  -i docs/class.mmd \
  -o docs/class.svg
