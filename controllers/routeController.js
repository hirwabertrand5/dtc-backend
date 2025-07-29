const Route = require('../models/Route');
const turf = require('@turf/turf'); // ✅ Added

// ✅ MISSING FUNCTION — add this first!
exports.getRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.status(200).json(routes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST: Create a new route
exports.createRoute = async (req, res) => {
  try {
    const { routeName, routeNumber, distance, estimatedTime, geoPath, stops } = req.body;

    const existingRoutes = await Route.find();
    let overlappingRoute = null;

    for (let existing of existingRoutes) {
      const existingLine = turf.lineString(existing.geoPath.coordinates);
      const newLine = turf.lineString(geoPath.coordinates);

      const intersects = turf.lineIntersect(existingLine, newLine);

      if (intersects.features.length > 0) {
        overlappingRoute = existing;
        break;
      }
    }

    const newRoute = new Route({ routeName, routeNumber, distance, estimatedTime, geoPath, stops });
    await newRoute.save();

    const response = {
      msg: "✅ Route Created",
      route: newRoute
    };

    if (overlappingRoute) {
      response.overlap = {
        status: true,
        message: `⚠️ Overlaps with existing route: ${overlappingRoute.routeName}`,
        overlappingRoute
      };
    } else {
      response.overlap = {
        status: false,
        message: "✅ No route overlaps"
      };
    }

    res.status(201).json(response);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
