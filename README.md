# ![logo](/icons/mountainReadme.svg) **Our Vanishing Glaciers**

## [*Visualizing a Half-Century of Glacier Loss in Glacier National Park, Montana*](https://efano.github.io/GNP-glaciers)

![Boulder Glacier in 1913](/photos/Boulder-1913.jpg)

### I. Introduction

Over 150 glaciers existed in Glacier National Park, Montana at the end of the Little Ice Age (mid-19th century). In 1966, the ark had 35 named glaciers large enough to be considered active. By 2015, only 26 of those glaciers remained. The average area loss was 39 percent, though some glaciers lost as much as 85 percent. This trend of glacier retreat is expected to continue as average temperatures rise.

Early scientists and park visitors noted that glaciers were retreating as early as 1914. The climate was already warming and glaciers were responding, but the industrial revolution added more carbon dioxide to the atmosphere, furthering glacier retreat. The United States Geological Survey (USGS) has been documenting [glacier area loss within the park](https://www.usgs.gov/centers/norock/science/retreat-glaciers-glacier-national-park?qt-science_center_objects=0#qt-science_center_objects) since 1966. These data consists of a time series of digitized glacier outlines for the 37 named glaciers of Glacier National Park and two glaciers on U.S. Forest Service’s Flathead National Forest land. The polygon features represent the main body portion of each glacier as analyzed from aerial imagery from the years 1966, 1998, 2005 and 2015, marking approximately 50 years of change in glacier area. Additionally, a maximum glacier extent dataset exists from the mid-19th century Little Ice Age (LIA) derived from terminal moraine locations.

This web mapping project will integrate the digitized glacier outlines for all years, display them interactively, and combine them with local climate data downloaded from the Northwest Alliance for Computational Science and Engineering, [Parameter-elevation Regressions on Independent Slopes Model (PRISM)](http://prism.oregonstate.edu/). The map will provide an interactive visualization of the decrease in glacier extent in response to a changing climate. It will be designed for both the public and professional audience.

### II. Methodology

Data for this project will be sourced from the United States Geological Survey (USGS), the National Park Service (NPS), Oregon State University and Portland State University. QGIS and Python 3 were used to munge and analyze the datasets.

#### A. Data

The content of the web map will be derived from the following data sources:

* Park boundary: [NPS Glacier National Park boundary shapefile](https://public-nps.opendata.arcgis.com/datasets/nps-boundary-1/data?orderBy=UNIT_CODE&page=17). The shapefile will be converted to JSON through the use of QGIS and Mapshaper.

* Historical and recent photographs: [USGS repeat photography Project](https://www.usgs.gov/centers/norock/science/repeat-photography-project?qt-science_center_objects=0#qt-science_center_objects).  Additional photographs are available from the [Department of Geology and Geography at Portland State University](http://glaciers.us/image-galleries/lewis-range-mt.html). Historical photographs will be downloaded, formatted/aligned, attributed, and resized for the web. Photographs that were part of the USGS Repeat Photography Project and can be aligned well enough to create a before/after photo slider will be aligned using Adobe Photoshop. Photos that do not align will be formatted as side-by-side before/after visualizations. Glaciers without two, comparable photos will be formatted to show one, recent photograph. These visualizations will be accessible to the user via a hyperlinked photograph icon on the legend for the individual glacier. A modal popup will display these visualizations when the icon is clicked. A photograph metadata CSV file will be created and joined to the mid-19century JSON polygon using QGIS.

* Glacier extent shapefiles: [USGS glacier extent polygon datasets (1966 - 2015)](https://www.sciencebase.gov/catalog/item/58af7022e4b01ccd54f9f542). The four shapefiles will be combined into one shapefile using QGIS and converted to JSON through the use of Mapshaper. Point data will be derived from the 2015 polygon shapefile in QGIS using the polygon to centroid point tool/script. The percent area loss (1966-2015) will be calculated and compared with the [USGS data table](https://www.usgs.gov/data-tools/area-named-glaciers-glacier-national-park-gnp-and-flathead-national-forest-fnf-including) and added to the point dataset. Active/Stagnant fields (Boolean y/n) in 1966 and 2015 will be manually determined based on computed area (< > 0.1 square km) and added to the file. The dataset will then be converted to JSON format using Mapshaper.

* Mid-19th century shapefile: [USGS Little Ice Age polygon dataset](https://www.sciencebase.gov/catalog/item/5b194f1ce4b092d965237f5f). The shapefile will be converted to JSON through the use of QGIS and Mapshaper. The historical photograph metadata will be joined with this dataset.

* Localized climatological data: 1966 - 2015 localized to individual glacier climatological data will be queried using the 2015 point dataset and extracted as CSV files from Oregon State University Northwest Alliance for Computational Science and Engineering, [Parameter-elevation Regressions on Independent Slopes Model (PRISM)](http://prism.oregonstate.edu/). The spatial resolution of each glacier point location is within four square kilometers, using a predetermined grid and using inverse-distance squared weighting between grid cells. A 15-year limit for bulk downloads from the PRISM site will result in multiple downloads to obtain the full 50-year dataset. These files will be merged into one CSV file and then loaded into a Jupyter Notebook to further format the data for project use. Using Python 3, the climate data will be resampled from monthly averages to annual averages to better display general trends on the relatively small map legend charts.

#### B. Medium for delivery

The map will be a web browser-based application accessible across mobile and desktop devices. All files and code will be hosted on Github and freely available to the public.

The technology stack for the application will be HTML/SVG/CSS/JS, jQuery, and Leaflet. The responsive and user interface framework will be Assembly.css. D3.js will be used as the charting library, and chroma.js will be used to determine the color scales used in symbolizing the glacier points.

#### C. Application layout

At full-size, the layout of the application will comprise of a 50-pixel navigational bar at the top of the application and an interactive map taking up the rest of the display.  Both elements will be developed following the responsive web design (RWD) approach to render well on a variety of devices and window or screen sizes.

#### D. Thematic representation

The project will integrate the digitized glacier outlines for all years, display them interactively, and combine them with local climate data. The climate data will be displayed as two, interactive line charts displaying annual average temperatures, and annual total precipitation between the years 1966 and 2015 for each individual glacier. A trend line, grouped by years between observations will be incorporated into the charts. Area loss by year will also be displayed as a bar chart for each glacier. Greatest area loss will be represented at a park-wide, small-scale visualization as colorized point data, and symbolized by either active or stagnant (< > 0.1 square km) in 1966 and 2015. The USGS, National Park Service (NPS), and Portland State University have a rich collection of historical photographs, including a repeat photography project that will also be accessible via a hyperlinked photograph icon on the legend for each individual glacier.

#### E. User interaction

The user will engage with the mapping application by initially selecting a glacier, symbolized as a point, by either clicking directly on the point or by selecting the glacier by name through the use of a dropdown list located on the top navigation bar. Once selected, the map will zoom to the full extent of the mid-19th century glacier outline and a custom legend will appear containing information and tools that will allow the user to further interact with the individual glacier. The legend will also contain an icon link to historical photos along with interactive climatic and area charts. A full extent icon, located on the top navigation bar can be used to zoom back to the full park extent where the map data will be returned to the original state of point data. Additional filtering is available through the glacier point legend to toggle between active and stagnant glacial states at the beginning of the study (1966) and the last measurement (2015).

#### F. Aesthetics and design considerations

The basemaps and base imagery used in the application are colorful and information-rich by design. The data therefore will also be color-saturated to stand out against the background maps. The legends and navigation bar will be a minimalistic, light-colored, grayscale motif, to not compete with the basemaps and data. A combination of flat and Material Design, and a sans-serif typeface will be used.

#### G. Conclusion

Anthropogenic climate change within Glacier National Park, Montana is strikingly clear. Glaciers are melting, and many have already vanished. The loss and rapid retreat of these small alpine glaciers reflect changes in climate as glaciers respond to changes in temperature and precipitation. There were approximately 150 glaciers present in 1850, and most glaciers were still present in 1910 when the park was established. In 2015, there were 26 glaciers greater than 25 acres, the size criteria used by USGS researchers to define a glacier. This interactive web mapping application will combine USGS glacier area measurements with climate data to visualize these changes.
