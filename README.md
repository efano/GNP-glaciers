# ![logo](/icons/mountainReadme.svg) Our Vanishing Glaciers

![Boulder Glacier in 1913](/photos/Boulder-1913.jpg)

## [*Visualizing a Half-Century of Glacier Loss in Glacier National Park, Montana*](https://efano.github.io/GNP-glaciers)

A web mapping application designed by [Lis Fano](https://efano.github.io/) as part of the University of Kentucky [New Maps Plus](https://newmapsplus.as.uky.edu/) graduate program

### I. Introduction

<img align="right" src="/photos/montana.jpg" height="170">

Over 150 alpine glaciers existed in Glacier National Park, Montana at the end of the Little Ice Age (mid-19th century). In 1966, the park had 35 named glaciers large enough to be considered active. By 2015, only 26 of those glaciers remained. The average area loss was 39 percent, though some glaciers lost as much as 85 percent. This trend of glacier retreat is expected to continue as average temperatures rise.

The United States Geological Survey (USGS) has been documenting [glacier area loss within the park](https://www.usgs.gov/centers/norock/science/retreat-glaciers-glacier-national-park?qt-science_center_objects=0#qt-science_center_objects) since 1966. These data consists of a time series of digitized glacier outlines for the 35 named glaciers within Glacier National Park and an additional two glaciers managed by the adjacent USDA Forest Service Flathead National Forest. The polygon features represent the main body portion of each glacier as analyzed from aerial imagery from the years 1966, 1998, 2005 and 2015, marking approximately 50 years of change in glacier area. A maximum glacier extent dataset derived from terminal moraine locations from the mid-19th century Little Ice Age (LIA) is also included in this interactive visualization tool.

This web mapping project integrates the digitized glacier outlines for all years, displays them interactively, and combines them with local climate data downloaded from the Northwest Alliance for Computational Science and Engineering, [Parameter-elevation Regressions on Independent Slopes Model (PRISM)](http://prism.oregonstate.edu/) website.

The application is designed to provide both the professional and public audience an interactive web experience that visualizes the decrease in glacier extent over time.

### II. Methodology

Data for this project is sourced from the [United States Geological Survey (USGS) Northern Rocky Mountain Science Center (NOROCK)](https://www.usgs.gov/centers/norock), the [National Park Service (NPS)](https://www.nps.gov/glac/index.htm), [Oregon State University](http://prism.oregonstate.edu/) and [Portland State University](http://glaciers.us/image-galleries/lewis-range-mt.html). QGIS and Python 3 are used to process and analyze the datasets.

#### A. Data

The content of the web map are derived from the following data sources:

* Park boundary: [NPS Glacier National Park boundary shapefile](https://public-nps.opendata.arcgis.com/datasets/nps-boundary-1/data?orderBy=UNIT_CODE&page=17). The shapefile was converted to JSON through the use of QGIS and Mapshaper.

* Historical and recent photographs: [USGS Repeat Photography Project](https://www.usgs.gov/centers/norock/science/repeat-photography-project?qt-science_center_objects=0#qt-science_center_objects) and [Department of Geology and Geography at Portland State University](http://glaciers.us/image-galleries/lewis-range-mt.html). Historical photographs were downloaded, formatted/aligned, attributed, and resized for the web. Photographs that were part of the USGS Repeat Photography Project and overlaid well enough to create a before/after photo slider were aligned using Adobe Photoshop. Photos that did not align were formatted as side-by-side before/after visualizations. Glaciers without two, comparable photos were formatted to show one, recent photograph. These visualizations are accessible to the user via a hyperlinked photograph icon on the legend for the individual glacier. A modal popup displays these visualizations when the icon is clicked.

* Glacier extent shapefiles: [USGS glacier extent polygon datasets (1966 - 2015)](https://www.sciencebase.gov/catalog/item/58af7022e4b01ccd54f9f542). The four shapefiles were combined into one shapefile using QGIS and converted to JSON through the use of Mapshaper. The point dataset was derived from the most recent 2015 polygon shapefile in QGIS using the polygon-to-centroid point tool/script. The percent area loss (1966-2015) was calculated and compared with the [USGS data table](https://www.usgs.gov/data-tools/area-named-glaciers-glacier-national-park-gnp-and-flathead-national-forest-fnf-including) and added to the point dataset. A Boolean field was created for the years 1966 and 2015 to indicate whether a glacier was considered active or stagnant for those years, based on the computed area (> < 0.1 square km). The dataset was then converted to JSON format using Mapshaper.

* Mid-19th century shapefile: [USGS Little Ice Age polygon dataset](https://www.sciencebase.gov/catalog/item/5b194f1ce4b092d965237f5f). The shapefile was converted to JSON through the use of QGIS and Mapshaper. The historical photograph metadata, visible in the modal popups, were joined with this dataset.

* Localized climatological data: localized 1966 - 2015 climatological data was queried using the 2015 point dataset and downloaded as CSV files from Oregon State University Northwest Alliance for Computational Science and Engineering, [Parameter-elevation Regressions on Independent Slopes Model (PRISM)](http://prism.oregonstate.edu/). The spatial resolution of each glacier point location is within four square kilometers, using a predetermined grid and using inverse-distance squared weighting between grid cells. A 15-year limit for bulk downloads from the PRISM site resulted in multiple downloads to obtain the full 50-year dataset. These files were then combined into one CSV file and loaded into a [Jupyter Notebook](https://github.com/efano/GNP-glaciers/blob/master/climate-data-exploratory.ipynb) to further format the data for project use. Using Python 3, the climate data was resampled from monthly averages to annual averages to better display general trends on the relatively small map legend charts.

#### B. Medium for delivery

The map is a web browser-based application accessible across mobile and desktop devices. All files and code are hosted on [Github](https://github.com/efano/GNP-glaciers) and freely available to the public.

The technology stack for this application includes HTML/SVG/CSS/JS, jQuery, and Leaflet. The responsive and user interface framework includes the use of Mapbox's Assembly.css and vanilla JavaScript. D3.js has been used as the charting library, and chroma.js to determine the color scales used in symbolizing the glacier points.

#### C. Application layout

At full-size, the layout of the application comprises of a 50-pixel navigational bar at the top of the application and an interactive map taking up the rest of the display.  Both elements were developed following the responsive web design (RWD) approach to render well on a variety of devices and window or screen sizes.

#### D. Thematic representation

The project integrates the digitized glacier outlines for all years, displays them interactively, and combines them with local climatological data. The climate data is displayed as two, interactive line charts displaying annual average temperatures, and annual total precipitation between the years 1966 and 2015 for each individual glacier. A trend line, grouped by years between observations is incorporated into both charts. Area loss by year is displayed as a bar chart for each glacier. Greatest area loss is represented at a park-wide, small-scale visualization as colorized point data, and symbolized by either active or stagnant ( > < 0.1 square km) in 1966 and 2015. The USGS, NPS, and Portland State University have a rich collection of historical photographs, including a repeat photography project that is accessible via a hyperlinked photograph icon on the legend for each individual glacier.

#### E. User interaction

The user engages with the mapping application by initially selecting a glacier, symbolized as a point, by either clicking directly on the point or by selecting the glacier by name through the use of a dropdown list located on the top navigation bar. Once selected, the map will zoom to the full extent of the mid-19th century glacier outline and a custom legend is dynamically created containing information and tools that allow the user to further interact with the individual glacier. The legend also contains an icon link to historical photos along with interactive climatic and area charts. A full extent icon, located on the top navigation bar can be used to zoom back to the full park extent where the map data returns to the original state of point data. Additional filtering is available through the glacier point legend to toggle between active and stagnant glacial states at the beginning of the study (1966) and the last measurement (2015). A collection of basemaps is accessible through the use of a basemap icon located on the top navigational bar. The user is able to minimize both legends to an icon for smaller devices, if necessary.

#### F. Aesthetics and design considerations

The basemaps and base imagery used in the application are colorful and information-rich by design. The data therefore is also color-saturated to stand out against the background maps. The legends and navigation bar are minimalistic and light-colored, to not compete with the basemaps and data. A combination of flat, Material Design, and Mapbox's Assembly.css is used for interface styling. Lato and Nunito typefaces have been chosen as fonts used in the application.

#### G. Conclusion

The loss and rapid retreat of these small alpine glaciers reflect changes in climate as glaciers respond to changes in temperature and precipitation. There were approximately 150 glaciers present in Glacier National Park in 1850, and most glaciers were still present in 1910 when the park was established. In 2015, there were 26 glaciers greater than 25 acres, the size criteria used by USGS researchers to define a glacier. This interactive web mapping application combines USGS glacier area measurements with climate data to visualize these changes.
