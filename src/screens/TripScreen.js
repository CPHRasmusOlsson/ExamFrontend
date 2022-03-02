import tripFacade from "../facades/tripFacade";
import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

const Trips = (props) => {
  const [error, setError] = useState();
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    tripFacade
      .dataThreads()
      .then((inputData) => {
        //console.log("INPUTDATA");
        setTrips(inputData);
      })
      .catch((fullError) => {
        fullError.then((err) => {
          console.log("ERROR");
          console.log(err);
          setError(err.message);
        });
      });
    //fetchData();
  }, []);

  const deleteTrip = async (id) => {
    await fetch(`http://localhost:8080/eksamen/api/trip/${id}`, {
      method: "DELETE",
    });

    setTrips(trips.filter((trips) => trips.id !== id));
  };

  return (
    <>
      {console.log(trips)}
      <div class="row">
        <div class="col-4"></div>
        <div class="col-4">
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Name</th>
                <th>Date</th>
                <th>Time</th>
                <th>Location</th>
                <th>Duration</th>
                <th>Packing List</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <>
                  <tr>
                    <td>{trip.name}</td>
                    <td>{trip.date}</td>
                    <td>{trip.time}</td>
                    <td>{trip.location}</td>
                    <td>{trip.duration}</td>
                    <td>{trip.packingList}</td>
                    {props.user && props.user.roles.includes("admin") ? (
                      <td>
                        <Button onClick={() => deleteTrip(trip.id)}>
                          Delete
                        </Button>
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div class="col-4"></div>
    </>
  );
};
export default Trips;
