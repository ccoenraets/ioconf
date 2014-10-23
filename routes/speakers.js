var speakers = [
    {id: 0, name: "Tim Kim", pic: "timkim.jpeg", bio: "9:00am"},
    {id: 1, name: "Bruce Lefebvre", pic: "bruce_lefebvre.png", bio: "11:00am"},
    {id: 2, name: "Brett Rudd", pic: "brettrudd.jpg", bio: "2:00pm"},
    {id: 3, name: "Joe Bowser", pic: "joe_bowser.jpg", bio: "1:00pm"},
    {id: 4, name: "Anis Kadri", pic: "anis.png", bio: "10:00am"},
    {id: 5, name: "Anthony Rumsey", pic: "anthony.jpeg", bio: "4:45pm"},
    {id: 6, name: "Michael Brooks", pic: "mwbrooks.jpeg", bio: "10:00am"},
    {id: 7, name: "Ray Camden", pic: "ray.jpg", bio: "1:00pm"},
    {id: 8, name: "Jason Weathersby", pic: "jasonweathersby.jpeg", bio: "3:00pm"},
    {id: 9, name: "Holly Schinsky", pic: "holly.jpg", bio: "3:00pm"}
];

exports.findAll = function (req, res, next) {
    res.send(speakers);
};

exports.findById = function (req, res, next) {
    var id = req.params.id;
    res.send(speakers[id]);
};