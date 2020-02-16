# [The Vanishing Glaciers of Glacier National Park](https://efano.github.io/GNP-glaciers)

## Visualizing Half a Century of Glacier Loss in Glacier National Park, Montana

### Project Description

... [glacier loss in Glacier National Park, Montana](https://www.usgs.gov/centers/norock/science/retreat-glaciers-glacier-national-park?qt-science_center_objects=0#qt-science_center_objects). The USGS has been documenting glacier area loss within the Park since 1966 using aerial and satellite imagery, and digitized DRGs. Datasets of digitized polygons of glacier outlines exist for 1966, 1998, 2005 and 2015. Additionally, a maximum glacier extent dataset exists from the mid-19th century Little Ice Age (LIA) based on terminal moraine locations. The USGS and NPS also have a rich collection of historical photographs, including a repeat photography project that will be incorporated into the web map.

### Datasets

* [USGS glacier extent polygon datasets (1966 - 2015)](https://www.sciencebase.gov/catalog/item/58af7022e4b01ccd54f9f542)

* [USGS Little Ice Age polygon dataset](https://www.sciencebase.gov/catalog/item/5b194f1ce4b092d965237f5f)

* [USGS repeat photography Project](https://www.usgs.gov/centers/norock/science/repeat-photography-project?qt-science_center_objects=0#qt-science_center_objects)

* Additional photographs are available from the [Department of Geology and Geography at Portland State University](http://glaciers.us/image-galleries/lewis-range-mt.html)

* 1966 - 2015 localized to individual glacier (4km spatial resolution) climatological data queried and extracted from Oregon State University Northwest Alliance for Computational Science and Engineering, [Parameter-elevation Regressions on Independent Slopes Model (PRISM)](http://prism.oregonstate.edu/)

* [NPS Glacier National Park boundary shapefile](https://public-nps.opendata.arcgis.com/datasets/nps-boundary-1/data?orderBy=UNIT_CODE&page=17)

### State of the Data (2/19/2020)

* **Glacier National Park Boundary JSON:** Shapefile converted to JSON at (data/boundary.json).
* **Centroid Point JSON:** In progress, and possibly complete, depending on how the climate data is incorporated into the project. Point data of latest (2015) polygon shapefile were created in QGIS using the polygon to centroid point tool. Percent area loss (1966-2015) was calculated and compared with the [USGS data table](https://www.usgs.gov/data-tools/area-named-glaciers-glacier-national-park-gnp-and-flathead-national-forest-fnf-including) and added to the point dataset. This dataset was then converted to JSON format (data/glacier-pts.json).
* **Polygon JSONs:** Currently the data are in individual (by year) shapefiles. Shapefiles need to be combined and extensive attibute manipulation is required before the data geometries are simplified and converted to JSON.
* **Photographs:** Next in progress. Historical photographs will need to be downloaded, formated/aligned, attributed, and resized for the web. Photographs that are part of the USGS Repeat Photography Project that align well enough to create a before/after photo slider will be aligned using Adobe Photoshop. Photos that don't align will be formated as a side by side before/after visualization. These visualizations will be accessable to the user via a hyperlinked photograph icon on the individual polygon/glacier legend. A modal popup will display these visualizations when the icon is clicked.
* **Climate data:** The climate data are currently in raw, unstrustured .csv formats. A 15-year limit for bulk downloads from the PRISM site resulted in multiple downloads to obtain the full 50-year dataset. These files will eventually be merged into one .csv file and then either joined to one of the final polygon or point JSONS, or incorporated into the JSON itself. A line graph with trend line will display the 50-year change in average annual temperature on the individual polygon/glacier legend.
