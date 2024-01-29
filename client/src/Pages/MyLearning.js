import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

const MyLearning = () => {
  const user = useSelector((state) => state.user);
  console.log(`User Name: ${user.name}, User ID: ${user.id}`);
  console.log("User State:", user);
  const [boughtCourses, setBoughtCourses] = useState([]);
  const [allCourses, setallCourses] = useState([]);
  const [purchaseCourse, setPurchaseCourse] = useState(false);

  const responseCourse = async () => {
    try {
      const res = await axios.get(
        "https://bigbulls.co.in/api/v1/auth/getAllCourses"
      );
      console.log(res.data);
      setallCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPurchasedCart = async () => {
    try {
      const response = await axios.get(
        `https://bigbulls.co.in/api/v1/auth/PurchasedCourseViaUser/${user.id}`
      );
      console.log(response.data.result);
      setBoughtCourses(response.data.result);
      setPurchaseCourse(true);
    } catch (error) {
      console.log(error);
    }
  };

  // console.log(boughtCourses.map((item) => JSON.parse(item.course_id)));

  let parsedCourses = boughtCourses.map((item) => {
    return item.course_id;
  });

  // Now, parsedCourses contains objects with parsed course_id properties
  const mergedArray = parsedCourses.flatMap((str) => JSON.parse(str));

  console.log(mergedArray);

  let courseData = allCourses.map((item) => {
    return item;
  });

  console.log(String(courseData));
  console.log(String(parsedCourses[0]));

  // const strParsedCourses = JSON.stringify(parsedCourses[0]);

  const filteredData = courseData.filter((course) => {
    return mergedArray?.some((mergedArray) => mergedArray === course.course_id);
  });

  console.log(filteredData);

  useEffect(() => {
    getPurchasedCart();
    responseCourse();
  }, []);

  return (
    <>
      <Container>
        <div className="container">
          {!purchaseCourse ? (
            <div className="boxlearning">
              <h2>You did not buy any courses yet.</h2>
              <Link to="/courses">
                {" "}
                <button className="btn btn-info">Buy Now</button>
              </Link>
            </div>
          ) : (
            <>
              <div className="container">
                {filteredData?.map((item, index) => (
                  <div className="box-contr d-flex justify-content-center align-items-center border mt-2 mb-2 p-2 rounded shadow">
                    <div className="imgdiv">
                      <img
                        src={item.thumbnails}
                        className=""
                        alt="Course Thumbnail"
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title text-start">
                        <Link to={`/course-details/${item.course_id}`}>
                          {item.course_name}
                        </Link>
                      </h5>
                      <p className="text-start">{item.category}</p>
                      <div className="d-flex justify-content-start">
                        <h5 className="text-start  ">4.9</h5>
                        <ul className="list-unstyled d-flex justify-content-start text-warning mb-1">
                          <li>
                            <i className="fas fa-star fa-sm"></i>
                          </li>
                          <li>
                            <i className="fas fa-star fa-sm"></i>
                          </li>
                          <li>
                            <i className="fas fa-star fa-sm"></i>
                          </li>
                          <li>
                            <i className="fas fa-star fa-sm"></i>
                          </li>
                          <li>
                            <i className="far fa-star fa-sm"></i>
                          </li>
                        </ul>
                      </div>
                      <h5 className="text-start">Price - ₹{item.price}</h5>
                      <Link to={`/course-details/${item.course_id}`}>
                        <button className="btn btn-warning">
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>

                  // <div className="" key={index}>
                  //   <div className="card course-card border rounded">
                  //     <div>

                  //       <div
                  //         className="absolute"
                  //         style={{ top: "10px", right: "30px" }}
                  //       >
                  //         <div className="absolute">
                  //           {/* {Array.isArray(wishlistItem) &&
                  //           wishlistItem.some(
                  //             (wishlistItem) =>
                  //               wishlistItem.item_id === item.course_id
                  //           ) ? (
                  //             <BsSuitHeartFill className="icons-added" />
                  //           ) : (
                  //             <BsSuitHeartFill
                  //               onClick={() => addWishlist(item.course_id)}
                  //               className="icons"
                  //             />
                  //           )} */}
                  //         </div>
                  //       </div>
                  //     </div>
                  //     <div className="relative">
                  //       <div className="card-body">
                  //         <h5 className="card-title text-center">
                  //           <Link to={`/course-details/${item.course_id}`}>
                  //             {item.course_name}
                  //           </Link>
                  //         </h5>
                  //         <p className="text-center">{item.category}</p>
                  //         <div className="d-flex justify-center">
                  //           <h5 className="text-center  ">4.9</h5>
                  //           <ul className="list-unstyled d-flex justify-content-center text-warning mb-1">
                  //             <li>
                  //               <i className="fas fa-star fa-sm"></i>
                  //             </li>
                  //             <li>
                  //               <i className="fas fa-star fa-sm"></i>
                  //             </li>
                  //             <li>
                  //               <i className="fas fa-star fa-sm"></i>
                  //             </li>
                  //             <li>
                  //               <i className="fas fa-star fa-sm"></i>
                  //             </li>
                  //             <li>
                  //               <i className="far fa-star fa-sm"></i>
                  //             </li>
                  //           </ul>
                  //         </div>
                  //         <h5 className="text-center">
                  //           Price - ₹{item.price}
                  //         </h5>
                  //         {/* <div className="d-flex justify-content-center">
                  //           <button
                  //             className="btn btn-primary mt-1"
                  //             onClick={() => addCartTo(item.course_id)}
                  //           >
                  //             Add to Cart
                  //           </button>
                  //         </div> */}
                  //       </div>
                  //     </div>
                  //   </div>
                  // </div>
                ))}
                {/* <hr /> */}
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default MyLearning;
const Container = styled.div`
  .boxlearning {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .imgdiv {
    height: 20rem;
    width: auto;
    img {
      height: 100% !important;
      width: auto;
    }
  }
  a {
    text-decoration: none;
  }
`;
