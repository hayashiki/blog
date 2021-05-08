#!/bin/sh

yarn add i @material-ui/core @material-ui/icons @material-ui/lab  @material-ui/styles
yarn add i clsx
yarn add -D typescript @types/node @types/react @types/react-dom

mkdir src
mkdir src/assets
mkdir src/components
mkdir -p src/components/molecules/SectionHeader

mkdir src/layouts
mkdir src/layouts/DocsLayout
mkdir src/layouts/Main
mkdir src/layouts/Minimal
mkdir src/theme
mkdir src/types
mkdir src/views
