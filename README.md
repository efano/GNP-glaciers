# [Our Vanishing Glaciers](https://efano.github.io/GNP-glaciers)

## Visualizing a Half-Century of Glacier Loss in Glacier National Park, Montana

### Project Description

Glacier National Park had 35 named glaciers large enough to be considered active in 1966. By 2015, only 26 of those glaciers remained. The average area loss was 39 percent, though some glaciers lost as much as 85 percent. This trend of glacier retreat is expected to continue as average temperatures rise.

 The United States Geological Survey (USGS) has been documenting [glacier area loss within the Park](https://www.usgs.gov/centers/norock/science/retreat-glaciers-glacier-national-park?qt-science_center_objects=0#qt-science_center_objects) since 1966 using aerial and satellite imagery, and digital raster graphics (DRGs). Datasets of digitized polygons of glacier outlines exist for 1966, 1998, 2005 and 2015. Additionally, a maximum glacier extent dataset exists from the mid-19th century Little Ice Age (LIA) derived from terminal moraine locations. This web mapping project will integrate the digitized glacier outlines for all years, display them interactively, and combine them with localized (within 4 square kilometers using inverse-distance squared weighting) climate data downloaded from the Northwest Alliance for Computational Science and Engineering, [Parameter-elevation Regressions on Independent Slopes Model (PRISM)](http://prism.oregonstate.edu/). Climate data will be displayed as a line graph of trending monthly average temperatures from 1966-2015 for each individual glacier. Area loss by year will also be displayed as a bar graph for each glacier. Greatest area loss will be represented at a park-wide, small-scale visualization as colorized point data, and symbolized by either active or stagnant (< > 0.1 square km) in 1966 and 2015. The USGS, National Park Service (NPS), and Portland State University have a rich collection of historical photographs, including a repeat photography project that will also be incorporated into the project.

### Datasets

* [NPS Glacier National Park boundary shapefile](https://public-nps.opendata.arcgis.com/datasets/nps-boundary-1/data?orderBy=UNIT_CODE&page=17)

* [USGS repeat photography Project](https://www.usgs.gov/centers/norock/science/repeat-photography-project?qt-science_center_objects=0#qt-science_center_objects)

* Additional photographs are available from the [Department of Geology and Geography at Portland State University](http://glaciers.us/image-galleries/lewis-range-mt.html)

* [USGS glacier extent polygon datasets (1966 - 2015)](https://www.sciencebase.gov/catalog/item/58af7022e4b01ccd54f9f542)

* [USGS Little Ice Age polygon dataset](https://www.sciencebase.gov/catalog/item/5b194f1ce4b092d965237f5f)

* 1966 - 2015 localized to individual glacier (4km spatial resolution) climatological data queried and extracted from Oregon State University Northwest Alliance for Computational Science and Engineering, [Parameter-elevation Regressions on Independent Slopes Model (PRISM)](http://prism.oregonstate.edu/)

### State of the Data (03/04/2020)

* **Glacier National Park Boundary JSON:** Complete. Shapefile converted to JSON at (data/boundary.json).

* **Centroid Point JSON:** Complete. Point data of latest (2015) polygon shapefile were created in QGIS using the polygon to centroid point tool/script. Percent area loss (1966-2015) was calculated and compared with the [USGS data table](https://www.usgs.gov/data-tools/area-named-glaciers-glacier-national-park-gnp-and-flathead-national-forest-fnf-including) and added to the point dataset. Active/Stagnant fields (Boolean y/n) in 1966 and 2015 were manually determined based on computed area (< > 0.1 square km) and added to the file. The dataset was then converted to JSON format (data/glacier-pts.json).

* **Photographs:** Complete. Historical photographs were downloaded, formatted/aligned, attributed, and resized for the web. Photographs that were part of the USGS Repeat Photography Project and aligned well enough to create a before/after photo slider were aligned using Adobe Photoshop. Photos that didn't align were formatted as a side-by-side before/after visualization. Glaciers without two, comparable photos were formatted to show one, recent photograph. These visualizations will be accessible to the user via a hyperlinked photograph icon on the legend for the individual glacier. A modal popup will display these visualizations when the icon is clicked. A sample of the formatted photos [can be viewed here](https://efano.github.io/GNP-glaciers/photo-slider-test.html). A photograph metadata .csv file was created and joined to the polygon JSON to dynamically display the photos.

* **Polygon JSONs:** Complete, contingent on file size constraints. All polygon datasets were combined into one dataset using QGIS. Photograph metadata were joined to the 2015 polygons. The shapefile was then exported to GeoJSON and simplified by 92% using Mapshaper, reducing the file size to 4MB. If too large the dataset could be separated into individual years.

* **Climate data:** Next in progress. The climate data are currently in raw, unstructured .csv formats. A 15-year limit for bulk downloads from the PRISM site resulted in multiple downloads to obtain the full 50-year dataset. These files will eventually be merged into one .csv file and then either joined to one of the final polygon or point JSONS, or incorporated into the JSON itself. A line graph with trend line will display the 50-year change in average monthly temperature for each individual glacier location.
