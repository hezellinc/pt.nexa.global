#!/bin/bash
find src -name "*.tsx" -type f -exec sed -i -e 's/text-gray-500 dark:text-gray-400/text-gray-400/g' \
-e 's/text-emerald-600 dark:text-emerald-400/text-emerald-400/g' \
-e 's/text-purple-600 dark:text-purple-400/text-purple-400/g' \
-e 's/text-amber-600 dark:text-amber-400/text-amber-400/g' \
-e 's/border-white\/20 dark:border-white\/5/border-white\/10/g' \
-e 's/hover:bg-black\/5 dark:hover:bg-white\/5/hover:bg-white\/5/g' \
-e 's/border-black\/10 dark:border-white\/10/border-white\/10/g' \
-e 's/grayscale-0 dark:grayscale-\[20%\] dark:invert-\[90%\] dark:hue-rotate-180/grayscale-[20%] invert-[90%] hue-rotate-180/g' \
-e 's/hover:bg-white\/50/hover:bg-white\/10/g' {} +
