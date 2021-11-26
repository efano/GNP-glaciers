        // navbar dropdowns
        // show baselayer dropdown menu
        function baselayerDropdownFunction() {
          document.getElementById("baselayerDropdownList").classList.toggle("show1");
        }
        window.addEventListener('click', function (event) {
          if (!event.target.matches('#baselayer-btn-dropdown')) {
            const dropdown1 = document.getElementsByClassName("dropdown-content1");
            let i;
            for (i = 0; i < dropdown1.length; i++) {
              const openDropdown1 = dropdown1[i];
              if (openDropdown1.classList.contains('show1')) {
                openDropdown1.classList.remove('show1');
              }
            }
          }
        });

        // show glaciers dropdown menu
        function glacierDropdownFunction() {
          document.getElementById("glacierDropdownList").classList.toggle("show2");
        }
        window.addEventListener('click', function (event) {
          if (!event.target.matches('#glacier-btn-dropdown')) {
            const dropdown2 = document.getElementsByClassName("dropdown-content2");
            let i;
            for (i = 0; i < dropdown2.length; i++) {
              const openDropdown2 = dropdown2[i];
              if (openDropdown2.classList.contains('show2')) {
                openDropdown2.classList.remove('show2');
              }
            }
          }
        });

        $(document).ready(function () {

          // set default `pagecontainer` for all popups (optional, but recommended for screen readers and iOS
          $.fn.popup.defaults.pagecontainer = '#page'

          // initialize the modal plugin
          $('.photoModals').popup({
            transition: 'all 0.6s',
            blur: false
          });

          // initialize photo slider
          $.fn.BeerSlider = function (options) {
            options = options || {};
            return this.each(function () {
              new BeerSlider(this, options);
            });
          };
          $('.beer-slider').BeerSlider();

          // basemaps
          const topoESRI = L.tileLayer(
            'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri, USGS, NPS, and the GIS User Community' + '<br>' +
                "<span id='appDevBy'>Application developed by:&thinsp; </span><a id='me' href='https://efano.github.io/' target='_blank'>Lis Fano</a>",
              opacity: 0.85
            });
          const imageryESRI = L.tileLayer(
            'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri, USGS, NPS, and the GIS User Community' + '<br>' +
                "<span id='appDevBy'>Application developed by:&thinsp; </span><a id='me' href='https://efano.github.io/' target='_blank'>Lis Fano</a>",
              opacity: 0.85
            });
          const topoUSGS = L.tileLayer(
            'https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri, USGS, NPS, and the GIS User Community' + '<br>' +
                "<span id='appDevBy'>Application developed by:&thinsp; </span><a id='me' href='https://efano.github.io/' target='_blank'>Lis Fano</a>",
              opacity: 0.85
            });
          const imageryUSGS = L.tileLayer(
            'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri, USGS, NPS, and the GIS User Community' + '<br>' +
                "<span id='appDevBy'>Application developed by:&thinsp; </span><a id='me' href='https://efano.github.io/' target='_blank'>Lis Fano</a>",
            });
          const imageryTopoUSGS = L.tileLayer(
            'https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryTopo/MapServer/tile/{z}/{y}/{x}', {
              attribution: 'Tiles &copy; Esri, USGS, NPS, and the GIS User Community' + '<br>' +
                "<span id='appDevBy'>Application developed by:&thinsp; </span><a id='me' href='https://efano.github.io/' target='_blank'>Lis Fano</a>",
            });
          const voyagerCARTO = L.tileLayer(
            'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
              attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' + '<br>' +
                "<span id='appDevBy'>Application developed by:&thinsp; </span><a id='me' href='https://efano.github.io/' target='_blank'>Lis Fano</a>",
              subdomains: 'abcd',
              maxZoom: 19
            });
          const darkCARTO = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' + '<br>' +
              "<span id='appDevBy'>Application developed by:&thinsp; </span><a id='me' href='https://efano.github.io/' target='_blank'>Lis Fano</a>",
            subdomains: 'abcd',
            maxZoom: 19
          });

          const options = {
            center: [48.65, -113.75],
            zoom: 9,
            maxZoom: 16,
            zoomSnap: .1,
            layers: topoESRI
          };

          const map = L.map('map', options);

          let baseLayers = {
            "ESRI Topo": topoESRI,
            "ESRI Imagery": imageryESRI,
            "USGS Topo": topoUSGS,
            "USGS Imagery": imageryUSGS,
            "USGS Imagery Topo": imageryTopoUSGS,
            "CARTO Voyager": voyagerCARTO,
            "CARTO Dark": darkCARTO,
          };

          // basemap legend
          const control = L.control.layers(baseLayers, null, {
            collapsed: false,
          }).addTo(map);

          // move baselayer control icon to navbar
          let htmlObject = control.getContainer();
          // get the desired parent node
          let newParent = document.getElementById('baselayerDropdown');
          // append the node to the new parent, recursively searching out and re-parenting nodes
          function setParent(el, newParent) {
            newParent.appendChild(el);
          };
          setParent(htmlObject, newParent);

          // assign id to basemap legend to hide radio buttons
          $('#baselayerDropdown .leaflet-control-layers .leaflet-control-layers-list .leaflet-control-layers-base label div span')
            .attr('id', 'radioText');

          // create scalebar
          L.control.scale({
            position: 'bottomright',
            metric: true,
            maxWidth: 120,
          }).addTo(map);

          // global variables
          let status = "active1966";

          // use D3 fetch to request data with async requests
          const parkBoundary = d3.json('data/boundary.json');
          const lia = d3.json('data/lia-poly.json');
          const polys66 = d3.json('data/polys66.json');
          const polys98 = d3.json('data/polys98.json');
          const polys05 = d3.json('data/polys05.json');
          const polys15 = d3.json('data/polys15.json');
          const allPoints = d3.json('data/glacier-pts.json');
          const climateCSV = d3.csv('data/climate-all.csv');
          const areaCSV = d3.csv('data/area-all.csv');


          // use Promise to wait until data is all loaded
          Promise.all([parkBoundary, lia, polys66, polys98, polys05, polys15, allPoints, climateCSV, areaCSV])
            .then(
              drawMap);

          function drawMap(data) {

            // pull out separate data arrays and assign to variables
            const boundsData = data[0];
            const liaData = data[1];
            const polys66Data = data[2];
            const polys98Data = data[3];
            const polys05Data = data[4];
            const polys15Data = data[5];
            const ptData = data[6];
            const climateData = data[7];
            const areaData = data[8];

            // create a park boundary layer with the geojson data
            const parkBounds = L.geoJson(boundsData, {
              style: function (feature, layer) {
                return {
                  color: '#989898',
                  weight: 1.5,
                  lineJoin: 'round',
                  dashArray: '2,4'
                };
              }
            }).addTo(map);
            extentIcon(parkBounds);

            // extent button on click
            function extentIcon(parkBounds) {
              $('#globe-icon').click(function () {
                map.flyToBounds(parkBounds.getBounds());
              });
            };

            // create a point layer with the geojson data
            const glacierPoints = L.geoJson(ptData, {
              pointToLayer: function (feature, latlng) {
                return L.shapeMarker(latlng)
              }
            }).addTo(map);

            // fit map bounds to feature extent
            map.fitBounds(glacierPoints.getBounds(), {
              padding: [20, 20]
            });

            map.on('zoomend', function () {
              const zoomlevel = map.getZoom();
              if (zoomlevel >= 12) {
                $('#dropdown-list2 .dropdown-item2').removeClass('highlight');
                $(".glacierPtLegend").fadeOut();
                $(".glacierPtLegendSm").fadeOut();
                if (map.hasLayer(glacierPoints)) {
                  map.removeLayer(glacierPoints);
                }
                $(".leaflet-tooltip-pane").empty();
                map.addLayer(allPolys);
                addInteractionsLIA(liaLayer);
                addInteractions66(layer66);
                addInteractions98(layer98);
                addInteractions05(layer05);
                addInteractions15(layer15);
                togglePolys();
              }
              if (zoomlevel < 12 && zoomlevel > 8) {
                liaLayer.resetStyle();
                layer66.resetStyle();
                layer98.resetStyle();
                layer05.resetStyle();
                layer15.resetStyle();
                if (map.hasLayer(allPolys)) {
                  map.removeLayer(allPolys);
                }
                $("#glacier-btn-dropdown").html("Select Glacier &thinsp;&#9662;").text();
                map.addLayer(glacierPoints);
                drawPts(glacierPoints);
                drawPtLegend();
                $(".legendPolyList").fadeOut("fast");
                $('#glacierPolyLegendSm').fadeOut("fast");
                $(".leaflet-tooltip-pane").empty();
                $('#dropdown-list2 .dropdown-item2').removeClass('highlight');
              }
              if (zoomlevel <= 8) {
                $('#dropdown-list2 .dropdown-item2').removeClass('highlight');
                $(".glacierPtLegend").fadeOut();
                $(".glacierPtLegendSm").fadeOut();
                if (map.hasLayer(glacierPoints)) {
                  map.removeLayer(glacierPoints);
                }
              }
            });

            // call functions
            drawPts(glacierPoints);
            buildPtUI(glacierPoints);
            drawDropDownList(ptData);
            highlightGlacier(glacierPoints);
            zoomToGlacier(glacierPoints);
            removeLists();
            drawPolyLegend();
            drawPtLegend();
            togglePtLegend();

            // draw glacier points
            function drawPts(glacierPoints) {
              colorize = getColors(glacierPoints);
              glacierPoints.eachLayer(function (layer) {
                let props = layer.feature.properties;
                let type = props[status];

                if (type === "y") {
                  layer.bringToBack();
                  layer.setStyle({
                    shape: "diamond",
                    color: '#333',
                    fillColor: colorize(props.pctD),
                    fillOpacity: 1,
                    weight: 1.2,
                    radius: 7,
                  })
                } else if (type === "n") {
                  layer.bringToFront();
                  layer.setStyle({
                    shape: "x",
                    color: colorize(props.pctD),
                    weight: 3,
                    radius: 7,
                  })
                };

                // tooltip
                layer.bindTooltip("<div class='tooltipTitle'>" + props["GLACNAME"] +
                  "</div><br>" +
                  "<div class='tooltipText'>" + "Area loss:&thinsp;" +
                  '<a class="tooltipPct" style="color:' + colorize(props.pctD) + '"> ' + (parseFloat(props["pctD"]) * 100).toFixed(0) + "%" + '</a>', {
                    opacity: 1
                  });

                //when mousing over a glacier point
                layer.on('mouseover', function () {
                  layer.bringToFront();
                  // provide a visual affordance
                  layer.setStyle({
                    radius: 16
                  });
                  // select the cooresponding list item and add the highlight class to make bold
                  $('#glacierList-' + props.num).addClass('highlight');
                });

                layer.on('mouseout', function () {
                  // reset back to our base styling opacity
                  layer.setStyle({
                    radius: 7
                  });
                  $('#glacierList-' + props.num).removeClass('highlight');
                });

                layer.on('mousedown', function () {
                  let num = layer.feature.properties.num
                  map.removeLayer(glacierPoints);
                  $("#wrapper2").empty();
                  $("#wrapper3").empty();
                  // change 'Select Glacier' button to glacier name
                  let btnObj = $("#glacier-btn-dropdown");
                  $(btnObj).text($(".highlight").text());
                  $(btnObj).val($(".highlight").text());
                  $('[id="glacierDropdownList"]').removeClass('show2');
                  $('[id="baselayerDropdownList"]').removeClass('show1');

                  // loop through the glacier lia polygons
                  liaLayer.eachLayer(function (layer) {
                    let glacierNum = parseInt(num);
                    let liaProps = layer.feature.properties.num;
                    // if the glacier id matches...
                    if (liaProps === glacierNum) {
                      updatePolyLegend(layer);
                      map.flyToBounds(layer.getBounds(), {
                        padding: [10, 10]
                      });
                    }
                  });

                  if ($(".glacierPtLegendSm").is(":visible")) {
                    $(".glacierPtLegendSm").fadeOut("fast");
                  } else {
                    $(".glacierPtLegend").fadeOut("fast");
                  }

                  $(".legendPolyList").fadeIn(1600);
                });
              })
            };

            // draw pt legend
            function drawPtLegend() {
              if ($(".glacierPtLegendSm").is(":visible")) {
                $(".glacierPtLegendSm").fadeIn(1000);
              } else {
                $(".glacierPtLegend").fadeIn(1500);
              }
            };

            // toggle pt legend
            function togglePtLegend() {
              $('.legendPtCloseIcon').click(function () {
                $('.glacierPtLegend').fadeOut();
                $('.glacierPtLegendSm').fadeIn();
              });

              $('.glacierPtLegendSm').click(function () {
                $('.glacierPtLegendSm').fadeOut();
                $('.glacierPtLegend').fadeIn();
              });
            };

            // build active/static toggle ui
            function buildPtUI(glacierPoints) {
              $("input[name='toggle-small pt-radio']").change(function () {
                let activeTxt = this.value;
                status = activeTxt;
                drawPts(glacierPoints);
              });
            };

            // create color scheme for point layer
            function getColors(glacierPoints) {
              // create chroma.js color scheme
              const glacierLoss = [];

              // loop through the glacier points
              glacierPoints.eachLayer(function (layer) {
                glacierLoss.push(layer.feature.properties.pctD);
              });

              // use chroma.limits to determine
              const breaks = chroma.limits(glacierLoss, 'q', 7);
              // build a colorize function
              let colorize = chroma
                .scale(['#ffccbc', '#ffab91', '#ff7043', '#f4511e', '#e64a19', '#bf360c'])
                .domain(breaks)
                .mode('lch');
              return colorize;
            };

            // create Select Glacier dropdown list
            function drawDropDownList(ptData) {
              // store a reference to the glacier dropdown list
              const legendList = $('#dropdown-list2');
              const legendNameList = [];
              for (names in ptData.features) {
                const props = ptData.features[names].properties;
                legendNameList.push(props);
              };

              // alphabetize glacier dropdown list
              legendNameList.sort(function (a, b) {
                return a.GLACNAME - b.GLACNAME
              });
              // add glacier names to the glacier dropdown list
              for (let i = 1; i <= ptData.features.length; i++) {
                const legendNames = [legendNameList[i - 1].GLACNAME];
                legendList.append('<li><a class="dropdown-item2" id="glacierList-' + i + '" value=' +
                  i + '>' +
                  legendNames + '</a></li>');
              };
            };

            // hightlight pt layer from dropdown list
            function highlightGlacier(glacierPoints) {

              // select list items and on mouseover
              $('.dropdown-item2').on('mouseover', function () {
                // extract the specific number from the specific item being moused over
                let num = this.id.replace('glacierList-', '');
                glacierNum = parseInt(num);

                // loop through the glacier points
                glacierPoints.eachLayer(function (layer) {
                  // if the glacier id matches...
                  if (layer.feature.properties.num === glacierNum) {
                    // change the layer style
                    layer.setStyle({
                      radius: 16
                    }).bringToFront();
                  };

                  // deselects layer highlight on legend mouseout
                  $('.dropdown-item2').on('mouseout', function () {
                    layer.setStyle({
                      radius: 7
                    });
                  });
                });
              })
            };

            map.createPane("liaLayer");
            map.getPane("liaLayer").style.zIndex = 446;
            map.createPane("layer66");
            map.getPane("layer66").style.zIndex = 447;
            map.createPane("layer98");
            map.getPane("layer98").style.zIndex = 448;
            map.createPane("layer05");
            map.getPane("layer05").style.zIndex = 449;
            map.createPane("layer15");
            map.getPane("layer15").style.zIndex = 450;

            // create a LIA layer with the geojson data
            const liaLayer = L.geoJson(liaData, {
              style: function (feature, layer) {
                return {
                  color: "#a9a7ab",
                  fillColor: "white",
                  weight: 1.5,
                  opacity: 1,
                  fillOpacity: 0.4,
                  lineJoin: 'round',
                  dashArray: '3,4',
                  pane: "liaLayer",
                };
              },
            });

            const layer66 = L.geoJson(polys66Data, {
              style: function (feature, layer) {
                return {
                  color: "#26C6DA",
                  fillColor: "#80DEEA",
                  weight: 1.5,
                  opacity: 1,
                  fillOpacity: 0.4,
                  lineJoin: 'round',
                  dashArray: '3,4',
                  pane: "layer66",
                };
              },
            });

            const layer98 = L.geoJson(polys98Data, {
              style: function (feature, layer) {
                return {
                  color: "#00BCD4",
                  fillColor: "#4DD0E1",
                  weight: 1.5,
                  opacity: 1,
                  fillOpacity: 0.4,
                  lineJoin: 'round',
                  dashArray: '3,4',
                  pane: "layer98",
                };
              }
            });

            const layer05 = L.geoJson(polys05Data, {
              style: function (feature, layer) {
                return {
                  color: "#009DBD",
                  fillColor: "#26C6DA",
                  weight: 1.5,
                  opacity: 1,
                  fillOpacity: 0.4,
                  lineJoin: 'round',
                  dashArray: '3,4',
                  pane: "layer05",
                };
              }
            });

            const layer15 = L.geoJson(polys15Data, {
              style: function (feature, layer) {
                return {
                  color: "#00A0B5",
                  fillColor: "#00BCD4",
                  weight: 1.5,
                  opacity: 1,
                  fillOpacity: 0.4,
                  lineJoin: 'round',
                  dashArray: '3,4',
                  pane: "layer15",
                };
              }
            });

            const allPolys = L.layerGroup([liaLayer, layer66, layer98, layer05, layer15]);

            // add lia poly interactions
            function addInteractionsLIA(liaLayer) {
              liaLayer.eachLayer(function (layer) {
                let polyProps = layer.feature.properties;

                layer.on('mouseover', function () {
                  layer.setStyle({
                    color: "#ff3d00",
                    weight: 2,
                  });
                  // select the corresponding list item and add the highlight class to make bold
                  $('#glacierList-' + polyProps.num).addClass('highlight');
                });

                layer.on('mouseout', function () {
                  layer.setStyle({
                    color: "#a9a7ab",
                    weight: 1.5,
                  });
                  $('#glacierList-' + polyProps.num).removeClass('highlight');
                });

                // tooltip
                layer.bindTooltip("<div class='tooltipTitle'>" + polyProps["GLACNAME"] +
                  "</div><br>" +
                  "<div class='polyTooltipText'>" + "Extent: &thinsp;Mid-19th century" +
                  "<br></div>" +
                  "<div class='polyTooltipTextArea'>" + "Area: &thinsp;" +
                  "<span class='polyAreaBold'>" + Number(polyProps[
                    "AREA"] * 0.000001).toLocaleString() + " km&sup2; " + "</span>" +
                  "&thinsp;or" + "</div>" +
                  "<div class='polyTooltipTextAcres'>" +
                  "<span class='polyAreaBold'>" + (polyProps["AREA"] *
                    0.0002471053814671738146717).toFixed(3) + " acres" +
                  "</span></div>", {
                    opacity: 1,
                    sticky: true,
                  }
                );
              });
            };

            // add poly66 interactions
            function addInteractions66(layer66) {
              layer66.eachLayer(function (layer) {
                let polyProps = layer.feature.properties;

                layer.on('mouseover', function () {
                  layer.setStyle({
                    color: "#ff3d00",
                    weight: 2,
                  });

                  // select the corresponding list item and add the highlight class to make bold
                  $('#glacierList-' + polyProps.num).addClass('highlight');

                  // highlight bar chart bar
                  let legendPolyName = $('#glacier-btn-dropdown').val();
                  if (polyProps.GLACNAME === legendPolyName) {
                    $('#bar3').addClass('barHover');
                  };
                });

                layer.on('mouseout', function () {
                  layer.setStyle({
                    color: "#26C6DA",
                    weight: 1.5,
                  });

                  $('#glacierList-' + polyProps.num).removeClass('highlight');
                  $('#bar3').removeClass('barHover');
                });

                // tooltip
                layer.bindTooltip("<div class='tooltipTitle'>" + polyProps[
                    "GLACNAME"] +
                  "</div><br>" +
                  "<div class='polyTooltipText'>" + "Extent: &thinsp;1966" +
                  "<br></div>" +
                  "<div class='polyTooltipTextArea'>" + "Area: &thinsp;" +
                  "<span class='polyAreaBold'>" + Number(polyProps[
                    "AREA"] * 0.000001).toLocaleString() + " km&sup2; " + "</span>" +
                  "&thinsp;or" + "</div>" +
                  "<div class='polyTooltipTextAcres'>" +
                  "<span class='polyAreaBold'>" + (polyProps["AREA"] *
                    0.0002471053814671738146717).toFixed(3) + " acres" +
                  "</span></div>", {
                    opacity: 1,
                    sticky: true,
                  }
                );
              });
            };

            // add poly98 interactions
            function addInteractions98(layer98) {
              layer98.eachLayer(function (layer) {
                let polyProps = layer.feature.properties;

                layer.on('mouseover', function () {
                  layer.setStyle({
                    color: "#ff3d00",
                    weight: 2,
                  });
                  // select the corresponding list item and add the highlight class to make bold
                  $('#glacierList-' + polyProps.num).addClass(
                    'highlight');

                  // highlight bar chart bar
                  let legendPolyName = $('#glacier-btn-dropdown').val();
                  if (polyProps.GLACNAME === legendPolyName) {
                    $('#bar2').addClass('barHover');
                  };
                });

                layer.on('mouseout', function () {
                  layer.setStyle({
                    color: "#00BCD4",
                    weight: 1.5,
                  });
                  $('#glacierList-' + polyProps.num).removeClass(
                    'highlight');
                  $('#bar2').removeClass('barHover');
                });

                // tooltip
                layer.bindTooltip("<div class='tooltipTitle'>" + polyProps[
                    "GLACNAME"] +
                  "</div><br>" +
                  "<div class='polyTooltipText'>" + "Extent: &thinsp;1998" +
                  "<br></div>" +
                  "<div class='polyTooltipTextArea'>" + "Area: &thinsp;" +
                  "<span class='polyAreaBold'>" + Number(polyProps[
                    "AREA"] * 0.000001).toLocaleString() + " km&sup2; " + "</span>" +
                  "&thinsp;or" + "</div>" +
                  "<div class='polyTooltipTextAcres'>" +
                  "<span class='polyAreaBold'>" + (polyProps["AREA"] *
                    0.0002471053814671738146717).toFixed(3) + " acres" +
                  "</span></div>", {
                    opacity: 1,
                    sticky: true,
                  }
                );
              });
            };

            // add poly05 interactions
            function addInteractions05(layer05) {
              layer05.eachLayer(function (layer) {
                let polyProps = layer.feature.properties;

                layer.on('mouseover', function () {
                  layer.setStyle({
                    color: "#ff3d00",
                    weight: 2,
                  });
                  // select the corresponding list item and add the highlight class to make bold
                  $('#glacierList-' + polyProps.num).addClass(
                    'highlight');

                  // highlight bar chart bar
                  let legendPolyName = $('#glacier-btn-dropdown').val();
                  if (polyProps.GLACNAME === legendPolyName) {
                    $('#bar1').addClass('barHover');
                  };
                });

                layer.on('mouseout', function () {
                  layer.setStyle({
                    color: "#009DBD",
                    weight: 1.5,
                  });
                  $('#glacierList-' + polyProps.num).removeClass(
                    'highlight');
                  $('#bar1').removeClass('barHover');
                });

                // tooltip
                layer.bindTooltip("<div class='tooltipTitle'>" + polyProps[
                    "GLACNAME"] +
                  "</div><br>" +
                  "<div class='polyTooltipText'>" + "Extent: &thinsp;2005" +
                  "<br></div>" +
                  "<div class='polyTooltipTextArea'>" + "Area: &thinsp;" +
                  "<span class='polyAreaBold'>" + Number(polyProps[
                    "AREA"] * 0.000001).toLocaleString() + " km&sup2; " + "</span>" +
                  "&thinsp;or" + "</div>" +
                  "<div class='polyTooltipTextAcres'>" +
                  "<span class='polyAreaBold'>" + (polyProps["AREA"] *
                    0.0002471053814671738146717).toFixed(3) + " acres" +
                  "</span></div>", {
                    opacity: 1,
                    sticky: true,
                  }
                );
              });
            };

            // add poly15 interactions
            function addInteractions15(layer15) {
              layer15.eachLayer(function (layer) {
                let polyProps = layer.feature.properties;

                layer.on('mouseover', function () {
                  layer.setStyle({
                    color: "#ff3d00",
                    weight: 2,
                  });
                  // select the corresponding list item and add the highlight class to make bold
                  $('#glacierList-' + polyProps.num).addClass(
                    'highlight');

                  // highlight bar chart bar
                  let legendPolyName = $('#glacier-btn-dropdown').val();
                  if (polyProps.GLACNAME === legendPolyName) {
                    $('#bar0').addClass('barHover');
                  };
                });

                layer.on('mouseout', function () {
                  layer.setStyle({
                    color: "#00A0B5",
                    weight: 1.5,
                  });
                  $('#glacierList-' + polyProps.num).removeClass(
                    'highlight');
                  $('#bar0').removeClass('barHover');
                });

                // tooltip
                layer.bindTooltip("<div class='tooltipTitle'>" + polyProps[
                    "GLACNAME"] +
                  "</div><br>" +
                  "<div class='polyTooltipText'>" + "Extent: &thinsp;2015" +
                  "<br></div>" +
                  "<div class='polyTooltipTextArea'>" + "Area: &thinsp;" +
                  "<span class='polyAreaBold'>" + Number(polyProps[
                    "AREA"] * 0.000001).toLocaleString() + " km&sup2; " + "</span>" +
                  "&thinsp;or" + "</div>" +
                  "<div class='polyTooltipTextAcres'>" +
                  "<span class='polyAreaBold'>" + (polyProps["AREA"] *
                    0.0002471053814671738146717).toFixed(3) + " acres" +
                  "</span></div>", {
                    opacity: 1,
                    sticky: true,
                  }
                );
              });
            };

            // zoom to glacier from dropdown list and change selected glacier name in button
            function zoomToGlacier(glacierPoints) {

              // select list items and on mouseover
              $('.dropdown-item2').on('click', function () {
                map.removeLayer(glacierPoints);
                map.removeLayer(allPolys);
                $("#wrapper2").empty();
                $("#wrapper3").empty();

                // extract the specific number from the specific item being moused over
                let num = this.id.replace('glacierList-', '');
                glacierNum = parseInt(num);
                $('#glacierPolyLegendSm').fadeOut("fast");

                // change 'Select Glacier' button to glacier name
                btnObj = $(this).parent().parent().parent().siblings('button');
                $(btnObj).text($(this).text());
                $(btnObj).val($(this).text());

                // loop through the glacier lia polygons
                liaLayer.eachLayer(function (layer) {
                  let polyProps = layer.feature.properties.num;
                  // if the glacier id matches...
                  if (polyProps === glacierNum) {
                    updatePolyLegend(layer);

                    map.flyToBounds(layer.getBounds(), {
                      padding: [10, 10]
                    });
                  }
                });

                if ($(".glacierPtLegendSm").is(":visible")) {
                  $(".glacierPtLegendSm").fadeOut("fast");
                } else {
                  $(".glacierPtLegend").fadeOut("fast");
                }

                $(".legendPolyList").fadeIn(1600);
              })
            };

            // hide dropdown lists on zoom-click
            function removeLists() {
              $('.leaflet-control-zoom-in, .leaflet-control-zoom-out').click(function () {
                $('[id="glacierDropdownList"]').removeClass('show2');
                $('[id="baselayerDropdownList"]').removeClass('show1');
              });
            };

            // create polygon legend
            function drawPolyLegend() {
              const legendPolyList = L.control({
                position: 'bottomleft'
              });
              legendPolyList.onAdd = function (map) {
                div = L.DomUtil.create('div', 'legendPolyList');
                return div;
              }
              legendPolyList.addTo(map);
              $(".legendPolyList").hide();

              L.DomEvent.addListener(div, 'mousewheel', function (e) {
                L.DomEvent.stopPropagation(e);
              });
            }

            // toggle the polygon layers on the polygon legend
            function togglePolys() {

              $("#polyLIA").on('change', function () {
                if ($(this).is(':checked')) {
                  map.addLayer(liaLayer);
                  addInteractionsLIA(liaLayer);
                } else {
                  map.removeLayer(liaLayer);
                }
              }).change(); // chain function to work onload and onchange
              $("#poly66").on('change', function () {
                if ($(this).is(':checked')) {
                  map.addLayer(layer66);
                  addInteractions66(layer66);
                } else {
                  map.removeLayer(layer66);
                }
              }).change();
              $("#poly98").on('change', function () {
                if ($(this).is(':checked')) {
                  map.addLayer(layer98);
                  addInteractions98(layer98);
                } else {
                  map.removeLayer(layer98);
                }
              }).change();
              $("#poly05").on('change', function () {
                if ($(this).is(':checked')) {
                  map.addLayer(layer05);
                  addInteractions05(layer05);
                } else {
                  map.removeLayer(layer05);
                }
              }).change();
              $("#poly15").on('change', function () {
                if ($(this).is(':checked')) {
                  map.addLayer(layer15);
                  addInteractions15(layer15);
                } else {
                  map.removeLayer(layer15);
                }
              }).change();
            };

            // add legend content
            function updatePolyLegend(layer) {
              const legendPolyName = layer.feature.properties['GLACNAME'];
              const glacNum = layer.feature.properties['num'];
              const modalType = layer.feature.properties['P_TYPE'];
              const imageLeftM1 = layer.feature.properties['P_S1'];
              const imageRightM1 = layer.feature.properties['P_S2'];
              const imageM2 = layer.feature.properties['P_S3'];
              const imageM3 = layer.feature.properties['P_S5'];
              const attributionLM1 = layer.feature.properties['P1_ATTR_L'];
              const attributionRM1 = layer.feature.properties['P2_ATTR_R'];
              const attributionLM2 = layer.feature.properties['P3_ATTR_L'];
              const attributionRM2 = layer.feature.properties['P4_ATTR_R'];
              const attributionRM3 = layer.feature.properties['P5_ATTR_R'];
              const yearLM1 = layer.feature.properties['P1_YR_L'];
              const yearRM1 = layer.feature.properties['P2_YR_R'];
              const yearLM2 = layer.feature.properties['P3_YR_L'];
              const yearRM2 = layer.feature.properties['P4_YR_R'];
              const yearRM3 = layer.feature.properties['P5_YR_R'];

              const legendPolyTitle = "<div class='polyLegendMain'>" +
                "<h4 class='polyLegendTitle'>" +
                legendPolyName +
                $("#photoIcon").html() + "</h4>" + "</div>";
              $(".legendPolyList").html(legendPolyTitle);

              const closeIcon = $(".legendPolyCloseIcon").html();
              $(closeIcon).insertBefore(".polyLegendMain");

              // get modal type on camera icon click
              $("#camera-icon").click(function () {
                $(".modalTitle").append(legendPolyName);

                if (modalType === "1") {
                  function loadModal1Image() {
                    $("#imageLeftM1").attr("src", imageLeftM1);
                    $("#imageRightM1").attr("src", imageRightM1);
                  }
                  $.when(loadModal1Image()).done(function () {
                    $(".attributionLM1").text("Photo Left: " +
                      attributionLM1);
                    $(".attributionRM1").text("Photo Right: " +
                      attributionRM1);
                    $(".yearLM1").attr("data-beer-label", yearLM1);
                    $(".yearRM1").attr("data-beer-label", yearRM1);
                    $("#camera-icon").addClass("modal1_open");
                  });
                } else if (modalType === "3") {
                  function loadModal2Image() {
                    $("#imageM2").attr("src", imageM2);
                  }
                  $.when(loadModal2Image()).done(function () {
                    $(".attributionLM2").text("Photo Left: " +
                      attributionLM2);
                    $(".attributionRM2").text("Photo Right: " +
                      attributionRM2);
                    $(".yearLM2").attr("year-left", yearLM2);
                    $(".yearRM2").attr("year-right", yearRM2);
                    $("#camera-icon").addClass("modal2_open");
                  });
                } else if (modalType === "5") {
                  function loadModal3Image() {
                    $("#imageM3").attr("src", imageM3);
                  }
                  $.when(loadModal3Image()).done(function () {
                    $(".attributionRM3").text("Photo: " +
                      attributionRM3);
                    $(".yearRM3").attr("year-right", yearRM3);
                    $("#camera-icon").addClass("modal3_open");
                  });
                }
              });

              // clear modal components on modal close
              $(".modal_close").click(function () {
                $(".modalTitle").empty();
                $(".attributionLM1").empty();
                $(".attributionRM1").empty();
                $(".attributionLM2").empty();
                $(".attributionRM2").empty();
                $(".attributionRM3").empty();
                $("input[data-beer-label]").empty();
                $("input[year-left]").empty();
                $("input[year-right]").empty();
              });

              // toggle poly legend
              togglePolyLegend();

              function togglePolyLegend() {
                $('.closePolyIcon').click(function () {
                  $('.legendPolyList').fadeOut();
                  $('#glacierPolyLegendSm').fadeIn();
                });
                $('.glacierPolyLegendSm').click(function () {
                  $('#glacierPolyLegendSm').fadeOut();
                  $('.legendPolyList').fadeIn();
                });
              };

              const legendPolyAreaTitle = "<h4 class='polyLegendAreaTitle'>" +
                "Glacial Extents " +
                "</h4>"
              $(legendPolyAreaTitle).insertAfter("#camera-icon");

              // get polygon years toggle buttons
              const polygonYearsGroup = $("#polygonYearsGroup").html();
              $(polygonYearsGroup).insertAfter(".polyLegendAreaTitle");

              const areaChartTitle = "<h4 class='areaChartTitle'>" + "Glacier Area " +
                "<span class='areaChartSubTitle'>" + "(1966 &ndash; 2015)" + "</span>" +
                "</h4>"
              $(areaChartTitle).insertAfter("#switchGroup2");

              // d3.js bar chart
              getAreaData(areaData);

              function getAreaData(areaData) {
                // filter dataset
                const filteredData = areaData.filter(function (d) {
                  if (d["GLACNAME"] == legendPolyName) {
                    return d;
                  }
                })

                // alphabetize by year
                filteredData.sort(function (a, b) {
                  return a.Year - b.Year
                }).reverse();

                // compute area calculations
                const area1966 = filteredData[0].AREA;
                const area2015 = filteredData[3].AREA;
                const format = d3.format(",.3f");
                const areaDif = format((area1966 - area2015) * 0.000001);
                const areaAcres = format((area1966 - area2015) * 0.0002471053814671738146717);

                const areaChartText = "<div class='areaChartText'>" +
                  "50-year change in area: &thinsp;" + "<span class='areaChartCalcs'>" +
                  areaDif + " km&sup2;" + "</span>" + "&thinsp;or" + "<br>" +
                  "<span class='areaChartCalcs'>" + areaAcres + " acres" +
                  "</span>" + "</div>"
                $(areaChartText).insertAfter(".areaChartTitle");

                const chart1Canvas = "<div class='wrapper1' id='wrapper1'>" + "</div>"
                $(chart1Canvas).insertAfter(".areaChartText");

                // create bar chart dimensions
                const width = 230
                const height = 110
                let dimensions = {
                  width: width,
                  height: height,
                  margin: {
                    top: 7,
                    right: 0,
                    bottom: 15,
                    left: 30,
                  },
                }
                dimensions.boundedWidth = dimensions.width - dimensions.margin.left -
                  dimensions.margin
                  .right
                dimensions.boundedHeight = dimensions.height - dimensions.margin.top -
                  dimensions.margin
                  .bottom

                // draw canvas
                const wrapper1 = d3.select("#wrapper1")
                  .append("svg")
                  .attr("width", dimensions.width + dimensions.margin.left + dimensions
                    .margin.right)
                  .attr("height", dimensions.height + dimensions.margin.top + dimensions
                    .margin
                    .bottom)
                  .append("g")
                  .attr("transform", "translate(" + dimensions.margin.left + "," +
                    dimensions.margin
                    .top + ")");

                const bounds1 = wrapper1.append("g")
                  .attr("transform", "translate(" + dimensions.margin.left + "," +
                    dimensions.margin
                    .top + ")");

                // format the data
                filteredData.forEach(function (d) {
                  d.area = +d.AREA
                });

                const area = d => d.area
                const yAccessor = d => d.length
                const xAccessor = d => d.Year

                // create tooltip
                const tooltip1 = d3.select("body")
                  .append("div")
                  .attr("class", "tooltip1")
                  .style("position", "absolute")
                  .style("z-index", "10")
                  .style("visibility", "hidden")

                // create scales
                const xScale = d3.scaleLinear()
                  .domain([0, d3.max(filteredData, function (d) {
                    return d.area;
                  })])
                  .range([0, dimensions.boundedWidth])
                  .nice();

                const yScale = d3.scaleBand()
                  .domain(filteredData.map(function (d) {
                    return d.Year;
                  }))
                  .range([dimensions.boundedHeight, 0])
                  .padding(0.3);

                // add bars
                const bars = wrapper1.selectAll(".bar")
                  .data(filteredData)
                  .enter().append("rect")
                  .attr("class", "bar")
                  .attr("x", xScale(0))
                  .attr("y", function (d) {
                    return yScale(0);
                  })
                  .attr("width", function (d) {
                    return xScale(0);
                  })
                  .attr("height", yScale.bandwidth())

                  .on("mouseover", function (d) {
                    if (d.Year == 1966) {
                      layer66.eachLayer(function (layer) {
                        if (layer.feature.properties['GLACNAME'] == d[
                            "GLACNAME"] &&
                          layer.feature.properties['Year'] === "1966"
                        ) {
                          layer.setStyle({
                            color: "#ff3d00",
                            weight: 2,
                          });
                        }
                      });
                    }
                    if (d.Year == 1998) {
                      layer98.eachLayer(function (layer) {
                        if (layer.feature.properties['GLACNAME'] == d[
                            "GLACNAME"] &&
                          layer.feature.properties['Year'] === "1998"
                        ) {
                          layer.setStyle({
                            color: "#ff3d00",
                            weight: 2,
                          });
                        }
                      });
                    }
                    if (d.Year == 2005) {
                      layer05.eachLayer(function (layer) {
                        if (layer.feature.properties['GLACNAME'] == d[
                            "GLACNAME"] &&
                          layer.feature.properties['Year'] === "2005"
                        ) {
                          layer.setStyle({
                            color: "#ff3d00",
                            weight: 2,
                          });
                        }
                      });
                    }
                    if (d.Year == 2015) {
                      layer15.eachLayer(function (layer) {
                        if (layer.feature.properties['GLACNAME'] == d[
                            "GLACNAME"] &&
                          layer.feature.properties['Year'] === "2015"
                        ) {
                          layer.setStyle({
                            color: "#ff3d00",
                            weight: 2,
                          });
                        }
                      });
                    }

                    const format = d3.format(",.3f")
                    return tooltip1
                      .style("visibility", "visible")
                      .html("<span class='barYear'>" + d.Year + "</span><br>" +
                        "Area: &thinsp;" + "<span class='barArea'>" + format((d
                          .AREA) * 0.000001) +
                        " km&sup2;" + "</span>" + " or" + "<br>" +
                        "<span class=barTooltipTextAcres>" +
                        "<span class='barArea'>" + format(d.AREA *
                          0.0002471053814671738146717) + " acres" +
                        "</span></span>")
                  })
                  .on("mousemove", function (d) {
                    return tooltip1
                      .style("top", (d3.event.pageY - 70) + "px")
                      .style("left", (d3.event.pageX - 60) + "px");
                  })
                  .on("mouseout", function (d) {
                    if (d.Year == 1966) {
                      layer66.eachLayer(function (layer) {
                        layer.setStyle({
                          color: "#26C6DA",
                          weight: 1.5,
                        });
                      });
                    }
                    if (d.Year == 1998) {
                      layer98.eachLayer(function (layer) {
                        layer.setStyle({
                          color: "#00BCD4",
                          weight: 1.5,
                        });
                      });
                    }
                    if (d.Year == 2005) {
                      layer05.eachLayer(function (layer) {
                        layer.setStyle({
                          color: "#009DBD",
                          weight: 1.5,
                        });
                      });
                    }
                    if (d.Year == 2015) {
                      layer15.eachLayer(function (layer) {
                        layer.setStyle({
                          color: "#00A0B5",
                          weight: 1.5,
                        });
                      });
                    }
                    return tooltip1
                      .style("visibility", "hidden");
                  });

                // add unique id to each bar
                $('.bar').attr("id", function (i) {
                  return 'bar' + i;
                });


                //add x-axis
                const xAxis = wrapper1.append("g")
                  .attr("class", "x-axis")
                  .attr("transform", "translate(0," + dimensions.boundedHeight + ")")
                  .call(d3.axisBottom(xScale).ticks(3));

                // add y-axis
                const yAxis = wrapper1.append("g")
                  .attr("class", "y-axis")
                  .call(d3.axisLeft(yScale));

                // label y-axis
                const yAxisLabel = yAxis.append("text")
                  .attr("class", "x-axis-label")
                  .attr("fill", "#989898")
                  .attr("x", -dimensions.margin.top + 115)
                  .attr("y", -dimensions.margin.left + 150)
                  .attr("text-anchor", "middle")
                  .html("Area m&sup2;");

                // animate bars
                const animation = wrapper1.selectAll("rect")
                  .transition()
                  .duration(1200)
                  .delay(function (d, i) {
                    return (i * 100)
                  })
                  .attr("width", function (d) {
                    return xScale(d.AREA);
                  })
                  .attr("y", function (d) {
                    return yScale(d.Year);
                  })
              };

              // d3.js climate charts
              getClimateData(climateData);

              function getClimateData(climateData) {

                // filter dataset
                const filteredClimateData = climateData.filter(function (d) {
                  if (d["NUM"] == glacNum) {
                    return d;
                  }
                });

                // alphabetize by year
                filteredClimateData.sort(function (a, b) {
                  return a.YEAR - b.YEAR
                });

                buildLineSwitch();
                drawTempChart();
                drawPrecipChart();

                // climate chart toggle button 
                function buildLineSwitch() {

                  const climateDataTitle = "<h4 class='climateDataTitle'>" +
                    "Climatological Data " +
                    "</h4>"
                  $(climateDataTitle).insertAfter(".wrapper1");

                  const climateToggles = $("#climateChartsToggle").html();
                  $(climateToggles).insertAfter(".climateDataTitle");
                  $(".tempDiv").show();
                  $(".precipDiv").hide();

                  $("#tempToggle").click(function () {
                    $(".precipDiv").hide();
                    $(".tempDiv").show();
                    $("#wrapper2").empty();
                    drawTempChart();
                  });
                  $("#precipToggle").click(function () {
                    $(".tempDiv").hide();
                    $(".precipDiv").show();
                    $("#wrapper3").empty();
                    drawPrecipChart();
                  });
                };

                // d3.js temperature line chart
                function drawTempChart() {

                  // access data
                  const dataset = filteredClimateData
                  const yAccessor = d => +d.TMEANF;
                  const dateParser = d3.timeParse("%Y");
                  const xAccessor = d => dateParser(d.YEAR);

                  const chart2Canvas = $(".wrapper2").html();

                  // create chart dimensions
                  const width = 270
                  const height = 125
                  let dimensions = {
                    width: width,
                    height: height,
                    margin: {
                      top: 15,
                      right: 15,
                      bottom: 17,
                      left: 60,
                    },
                  }

                  dimensions.boundedWidth = dimensions.width -
                    dimensions.margin.left -
                    dimensions.margin.right
                  dimensions.boundedHeight = dimensions.height -
                    dimensions.margin.top -
                    dimensions.margin.bottom

                  // draw canvas
                  const wrapper2 = d3.select("#wrapper2")
                    .append("svg")
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height)

                  const bounds2 = wrapper2.append("g")
                    .style("transform",
                      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
                    )

                  // create scales
                  const yScale = d3.scaleLinear()
                    .domain(d3.extent(dataset, yAccessor))
                    .range([dimensions.boundedHeight, 0])
                    .nice()

                  const xScale = d3.scaleTime()
                    .domain(d3.extent(dataset, xAccessor))
                    .range([0, dimensions.boundedWidth])

                  // group data to get group mean
                  const yearNames = ["1966-1997", "1998-2004", "2005-2015"]

                  let yearsData = []

                  const startDate1 = xAccessor(dataset[0])
                  const endDate1 = xAccessor(dataset[32])
                  const startDate2 = xAccessor(dataset[32])
                  const endDate2 = xAccessor(dataset[39])
                  const startDate3 = xAccessor(dataset[39])
                  const endDate3 = xAccessor(dataset[49])

                  const group1 = d3.timeYears(startDate1, endDate1)
                  const yearsFilter1 = dataset.filter(d => xAccessor(d) >= startDate1 &&
                    xAccessor(
                      d) < endDate1)
                  if (!yearsFilter1.length) return
                  yearsData.push({
                    start: startDate1,
                    end: endDate1,
                    id: "group1",
                    name: yearNames[0],
                    mean: d3.mean(yearsFilter1, yAccessor),
                  })
                  const group2 = d3.timeYears(startDate2, endDate2)
                  const yearsFilter2 = dataset.filter(d => xAccessor(d) >= startDate2 &&
                    xAccessor(
                      d) < endDate2)
                  if (!yearsFilter2.length) return
                  yearsData.push({
                    start: startDate2,
                    end: endDate2,
                    id: "group2",
                    name: yearNames[1],
                    mean: d3.mean(yearsFilter2, yAccessor),
                  })
                  const group3 = d3.timeYears(startDate3, endDate3)
                  const yearsFilter3 = dataset.filter(d => xAccessor(d) >= startDate3 &&
                    xAccessor(
                      d) <= endDate3)
                  if (!yearsFilter3.length) return
                  yearsData.push({
                    start: startDate3,
                    end: endDate3,
                    id: "group3",
                    name: yearNames[2],
                    mean: d3.mean(yearsFilter3, yAccessor),
                  })

                  const yearOffset = 0
                  const yearArea = bounds2.selectAll(".yearArea")
                    .data(yearsData)
                    .enter().append("rect")
                    .attr("x", d => xScale(d.start))
                    .attr("width", d => xScale(d.end) - xScale(d.start))
                    .attr("y", yearOffset)
                    .attr("height", dimensions.boundedHeight - yearOffset)
                    .attr("class", d => `year ${d.id}`)

                  // draw annual line 
                  const lineGenerator = d3.line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(yAccessor(d)))
                    .curve(d3.curveMonotoneX);

                  const line = bounds2.append("path")
                    .attr("d", lineGenerator(dataset))
                    .attr("fill", "none")
                    .attr("stroke", "#333")
                    .attr("stroke-width", 1.5)
                    .attr("class", "line")

                  // draw peripherals
                  const yearGroupMeans = bounds2.selectAll(".year-group-mean1")
                    .data(yearsData)
                    .enter().append("line")
                    .attr("x1", d => xScale(d.start))
                    .attr("x2", d => xScale(d.end))
                    .attr("y1", d => yScale(d.mean))
                    .attr("y2", d => yScale(d.mean))

                  yearGroupMeans
                    .transition()
                    .delay(1400)
                    .duration(60)
                    .ease(d3.easeLinear)
                    .attr("class", "year-group-mean1")

                  const yAxisGenerator = d3.axisLeft()
                    .scale(yScale)
                    .ticks(4)

                  const yAxis = bounds2.append("g")
                    .attr("class", "y-axis")
                    .call(yAxisGenerator)

                  const yAxisLabel = yAxis.append("text")
                    .attr("class", "y-axis-label")
                    .attr("fill", "#989898")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -dimensions.boundedHeight / 2)
                    .attr("y", -dimensions.margin.left + 26)
                    .attr("text-anchor", "middle")
                    .html("Temperature (&#8239;&#8457;&#8239;)");

                  const yearValues = [startDate1, startDate2, startDate3, endDate3]

                  const xAxisGenerator = d3.axisBottom()
                    .scale(xScale)
                    .tickValues(yearValues)

                  const xAxis = bounds2.append("g")
                    .attr("class", "x-axis")
                    .call(xAxisGenerator)
                    .style("transform", `translateY(${(dimensions.boundedHeight)}px)`)

                  // animation
                  const totalLineLength = line.node().getTotalLength();

                  line
                    .attr("stroke-dasharray", totalLineLength + " " + totalLineLength)
                    .attr("stroke-dashoffset", totalLineLength)
                    .transition()
                    .duration(1200)
                    .ease(d3.easeLinear)
                    .attr("stroke-dashoffset", 0);

                  // hover interactions
                  const tooltipCircle = bounds2.append("circle")
                    .attr("class", "tooltip-circle")
                    .attr("r", 3.5)
                    .attr("stroke", "#333")
                    .attr("fill", "#ff3d00")
                    .attr("stroke-width", 2)
                    .style("opacity", 0)

                  const listeningRect = bounds2.append("rect")
                    .attr("class", "listening-rect")
                    .attr("width", dimensions.boundedWidth)
                    .attr("height", dimensions.boundedHeight)
                    .on("mousemove", onMouseMove)
                    .on("mouseleave", onMouseLeave)

                  // create tooltip
                  const tooltip2 = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip2")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .style("visibility", "hidden")

                  return tooltip2
                    .style("visibility", "visible")
                    .html("<span class='tooltip-date'>" + "<span class='date'>" +
                      "</span>" +
                      "</span>" + "<br>" +
                      "<span class='tooltip-text'>" + "</span>" +
                      "<div class='tooltip-text'>" +
                      "Average annual air" + "<br>" + "temperature: &thinsp;" +
                      "<span id='temp'>" + "</span></div>")

                  function onMouseMove() {
                    const mousePosition = d3.mouse(this)
                    const hoveredDate = xScale.invert(mousePosition[0])

                    const getDistanceFromHoveredDate = d => Math.abs(xAccessor(d) -
                      hoveredDate)
                    const closestIndex = d3.scan(dataset, (a, b) => (
                      getDistanceFromHoveredDate(a) -
                      getDistanceFromHoveredDate(b)
                    ))
                    const closestDataPoint = dataset[closestIndex]

                    const closestXValue = xAccessor(closestDataPoint)
                    const closestYValue = yAccessor(closestDataPoint)

                    const formatDate = d3.timeFormat("%Y")
                    tooltip2.select(".date")
                      .text(formatDate(closestXValue))

                    const formatTemperature = d => `${d3.format(".1f")(d)}°F`
                    tooltip2.select("#temp")
                      .text(formatTemperature(closestYValue))

                    const x = xScale(closestXValue) +
                      dimensions.margin.left
                    const y = yScale(closestYValue) +
                      dimensions.margin.top

                    tooltip2.style("transform", `translate(` +
                      `calc( -50% + ${x}px),` +
                      `calc(-100% + ${y}px)` +
                      `)`)

                    tooltip2.style("opacity", 1)

                    tooltipCircle
                      .attr("cx", xScale(closestXValue))
                      .attr("cy", yScale(closestYValue))
                      .style("opacity", 1)
                  }

                  function onMouseLeave() {
                    tooltip2.style("opacity", 0)
                    tooltipCircle.style("opacity", 0)
                  }
                };

                // d3.js precipitation line chart
                function drawPrecipChart() {

                  // access data
                  const dataset = filteredClimateData
                  const yAccessor = d => +d.PPTIN;
                  const dateParser = d3.timeParse("%Y");
                  const xAccessor = d => dateParser(d.YEAR);

                  const chart2Canvas = $(".wrapper3").html();

                  // create chart dimensions
                  const width = 270
                  const height = 125
                  let dimensions = {
                    width: width,
                    height: height,
                    margin: {
                      top: 15,
                      right: 15,
                      bottom: 17,
                      left: 60,
                    },
                  }

                  dimensions.boundedWidth = dimensions.width -
                    dimensions.margin.left -
                    dimensions.margin.right
                  dimensions.boundedHeight = dimensions.height -
                    dimensions.margin.top -
                    dimensions.margin.bottom

                  // draw canvas
                  const wrapper3 = d3.select("#wrapper3")
                    .append("svg")
                    .attr("width", dimensions.width)
                    .attr("height", dimensions.height)

                  const bounds3 = wrapper3.append("g")
                    .style("transform",
                      `translate(${dimensions.margin.left}px, ${dimensions.margin.top}px)`
                    )

                  // create scales
                  const yScale = d3.scaleLinear()
                    .domain(d3.extent(dataset, yAccessor))
                    .range([dimensions.boundedHeight, 0])
                    .nice()

                  const xScale = d3.scaleTime()
                    .domain(d3.extent(dataset, xAccessor))
                    .range([0, dimensions.boundedWidth])

                  // group data to get group mean
                  const yearNames = ["1966-1997", "1998-2004", "2005-2015"]

                  let yearsData = []

                  const startDate1 = xAccessor(dataset[0])
                  const endDate1 = xAccessor(dataset[32])
                  const startDate2 = xAccessor(dataset[32])
                  const endDate2 = xAccessor(dataset[39])
                  const startDate3 = xAccessor(dataset[39])
                  const endDate3 = xAccessor(dataset[49])

                  const group1 = d3.timeYears(startDate1, endDate1)
                  const yearsFilter1 = dataset.filter(d => xAccessor(d) >= startDate1 &&
                    xAccessor(
                      d) < endDate1)
                  if (!yearsFilter1.length) return
                  yearsData.push({
                    start: startDate1,
                    end: endDate1,
                    id: "group1",
                    name: yearNames[0],
                    mean: d3.mean(yearsFilter1, yAccessor),
                  })
                  const group2 = d3.timeYears(startDate2, endDate2)
                  const yearsFilter2 = dataset.filter(d => xAccessor(d) >= startDate2 &&
                    xAccessor(
                      d) < endDate2)
                  if (!yearsFilter2.length) return
                  yearsData.push({
                    start: startDate2,
                    end: endDate2,
                    id: "group2",
                    name: yearNames[1],
                    mean: d3.mean(yearsFilter2, yAccessor),
                  })
                  const group3 = d3.timeYears(startDate3, endDate3)
                  const yearsFilter3 = dataset.filter(d => xAccessor(d) >= startDate3 &&
                    xAccessor(
                      d) <= endDate3)
                  if (!yearsFilter3.length) return
                  yearsData.push({
                    start: startDate3,
                    end: endDate3,
                    id: "group3",
                    name: yearNames[2],
                    mean: d3.mean(yearsFilter3, yAccessor),
                  })

                  const yearOffset = 0
                  const yearArea = bounds3.selectAll(".yearArea")
                    .data(yearsData)
                    .enter().append("rect")
                    .attr("x", d => xScale(d.start))
                    .attr("width", d => xScale(d.end) - xScale(d.start))
                    .attr("y", yearOffset)
                    .attr("height", dimensions.boundedHeight - yearOffset)
                    .attr("class", d => `year ${d.id}`)

                  // draw annual line 
                  const lineGenerator = d3.line()
                    .x(d => xScale(xAccessor(d)))
                    .y(d => yScale(yAccessor(d)))
                    .curve(d3.curveMonotoneX);

                  const line = bounds3.append("path")
                    .attr("d", lineGenerator(dataset))
                    .attr("fill", "none")
                    .attr("stroke", "#333")
                    .attr("stroke-width", 1.5)
                    .attr("class", "line")

                  // draw peripherals
                  const yearGroupMeans = bounds3.selectAll(".year-group-mean2")
                    .data(yearsData)
                    .enter().append("line")
                    .attr("x1", d => xScale(d.start))
                    .attr("x2", d => xScale(d.end))
                    .attr("y1", d => yScale(d.mean))
                    .attr("y2", d => yScale(d.mean))

                  yearGroupMeans
                    .transition()
                    .delay(1400)
                    .duration(60)
                    .ease(d3.easeLinear)
                    .attr("class", "year-group-mean2")

                  const yAxisGenerator = d3.axisLeft()
                    .scale(yScale)
                    .ticks(4)

                  const yAxis = bounds3.append("g")
                    .attr("class", "y-axis")
                    .call(yAxisGenerator)

                  const yAxisLabel = yAxis.append("text")
                    .attr("class", "y-axis-label")
                    .attr("fill", "#989898")
                    .attr("transform", "rotate(-90)")
                    .attr("x", -dimensions.boundedHeight / 2)
                    .attr("y", -dimensions.margin.left + 26)
                    .attr("text-anchor", "middle")
                    .html("Precipitation (&#8239;in&#8239;)");

                  const yearValues = [startDate1, startDate2, startDate3, endDate3]

                  const xAxisGenerator = d3.axisBottom()
                    .scale(xScale)
                    .tickValues(yearValues)

                  const xAxis = bounds3.append("g")
                    .attr("class", "x-axis")
                    .call(xAxisGenerator)
                    .style("transform", `translateY(${(dimensions.boundedHeight)}px)`)

                  // animation
                  if ($('#wrapper3').is(':visible')) {

                    const totalLineLength = line.node().getTotalLength();

                    line
                      .attr("stroke-dasharray", totalLineLength + " " +
                        totalLineLength)
                      .attr("stroke-dashoffset", totalLineLength)
                      .transition()
                      .duration(1200)
                      .ease(d3.easeLinear)
                      .attr("stroke-dashoffset", 0);
                  };

                  // hover interactions
                  const tooltipCircle = bounds3.append("circle")
                    .attr("class", "tooltip-circle")
                    .attr("r", 3.5)
                    .attr("stroke", "#333")
                    .attr("fill", "#009DBD")
                    .attr("stroke-width", 2)
                    .style("opacity", 0)

                  const listeningRect = bounds3.append("rect")
                    .attr("class", "listening-rect")
                    .attr("width", dimensions.boundedWidth)
                    .attr("height", dimensions.boundedHeight)
                    .on("mousemove", onMouseMove)
                    .on("mouseleave", onMouseLeave)

                  // create tooltip
                  const tooltip3 = d3.select("body")
                    .append("div")
                    .attr("class", "tooltip3")
                    .style("position", "absolute")
                    .style("z-index", "10")
                    .style("visibility", "hidden")

                  return tooltip3
                    .style("visibility", "visible")
                    .html("<span class='tooltip-date'>" + "<span class='date'>" +
                      "</span>" +
                      "</span>" + "<br>" +
                      "<span class='tooltip-text'>" + "</span>" +
                      "<div class='tooltip-text'>" +
                      "Total annual" + "<br>" + "precipitation: &thinsp;" +
                      "<span id='precip'>" +
                      "</span></div>")

                  function onMouseMove() {
                    const mousePosition = d3.mouse(this)
                    const hoveredDate = xScale.invert(mousePosition[0])

                    const getDistanceFromHoveredDate = d => Math.abs(xAccessor(d) -
                      hoveredDate)
                    const closestIndex = d3.scan(dataset, (a, b) => (
                      getDistanceFromHoveredDate(a) -
                      getDistanceFromHoveredDate(b)
                    ))
                    const closestDataPoint = dataset[closestIndex]

                    const closestXValue = xAccessor(closestDataPoint)
                    const closestYValue = yAccessor(closestDataPoint)

                    const formatDate = d3.timeFormat("%Y")
                    tooltip3.select(".date")
                      .text(formatDate(closestXValue))

                    const formatTemperature = d => `${d3.format(".1f")(d)} in`
                    tooltip3.select("#precip")
                      .text(formatTemperature(closestYValue))

                    const x = xScale(closestXValue) +
                      dimensions.margin.left
                    const y = yScale(closestYValue) +
                      dimensions.margin.top

                    tooltip3.style("transform", `translate(` +
                      `calc( -50% + ${x}px),` +
                      `calc(-100% + ${y}px)` +
                      `)`)

                    tooltip3.style("opacity", 1)

                    tooltipCircle
                      .attr("cx", xScale(closestXValue))
                      .attr("cy", yScale(closestYValue))
                      .style("opacity", 1)
                  }

                  function onMouseLeave() {
                    tooltip3.style("opacity", 0)
                    tooltipCircle.style("opacity", 0)
                  }
                };
              };
            }
            $('#loader').remove();
          };
        });