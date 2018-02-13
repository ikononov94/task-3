    let myMap;

    ymaps.ready(function () {
        myMap = new ymaps.Map("myMap", {
            center: [55, 34],
            zoom: 5,
            controls: ['zoomControl']
        });

    });

    function addMark(city, colorPlacemark) {
        ymaps.geocode(city, { results: 1 }).then(function (res) {
                let firstGeoObject = res.geoObjects.get(0),
                    coords = firstGeoObject.geometry.getCoordinates();

                myMap.geoObjects.add(new ymaps.Placemark(coords, {
                    iconContent:city
                }, {
                    preset:`islands#${colorPlacemark}StretchyIcon`,
                    balloonMaxWidth:'250'
                }));

                myMap.setCenter(coords, 5);
            },

            function (err) {
                console.log(err.message);
            });
    }

    function removeMark() {
        myMap.geoObjects.removeAll();
        myMap.setCenter([55, 34], 5);
    }



