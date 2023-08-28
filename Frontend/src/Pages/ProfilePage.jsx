import React, { useEffect, useState } from "react";
import styled from "styled-components";
import styles from "../Css/ProfilePage.module.css";
import axios from "axios";
import PostCard from "../Components/PostCard";
import { Link, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/products/action";
import { CircularProgress, CircularProgressLabel, useToast } from "@chakra-ui/react";
const Profile = () => {
  const posts = useSelector((store) => store.productReducer.products);
  const [filterData, setFilterData] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedRating, setSelectedRating] = useState("");
  const [searchText, setSearchText] = useState("");
  const [originalData, setOriginalData] = useState([]);
  console.log(posts);
  const [pages, setPages] = useState(1);
  const Url = "https://moviesserver.onrender.com/movies";
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({});
  const toast=useToast()
  let obj = {
    params: {
      material: searchParams.getAll("material"),
      _sort: "currentprice",
      _order: searchParams.get("order"),
    },
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(pages));
  }, [searchParams]);

  useEffect(() => {
    if (posts.length !== 0) {
      setFilterData([...posts]);
      setOriginalData(posts);
    }
  }, [posts]);
  const genres = ["Animation", "Comedy", "Drama", "Horror", "Sci-fi"];
  const ratingOptions = [1, 2, 3, 4];
  console.log(filterData, "filter");

  const handelGenre = (e) => {
    setSelectedGenre(e.target.value);
    let newData = filterData.filter((el) => el.category === e.target.value);
    console.log(newData, "newData");
    setFilterData(newData); // Update the filtered data
  };
  const handleSort = (e) => {
    const sortValue = e.target.value;
    let newData = [...filterData];

    if (sortValue === "asc") {
      newData.sort((a, b) => a.year - b.year);
    } else if (sortValue === "desc") {
      newData.sort((a, b) => b.year - a.year);
    }

    setFilterData(newData);
  };
  const handelRating = (e) => {
    setSelectedRating(e.target.value);
    let newData = posts.filter((el) => el.rating >= parseInt(e.target.value));
    setFilterData(newData);
  };
  const filteredMovies = (e) => {
    setSearchText(e.target.value);
    if (e.target.value === "") {
      setFilterData(originalData);
    } else {
      const newData = filterData?.filter((movie) =>
        movie.name.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setFilterData(newData);
    }
  };
  console.log(searchText);

  const handelChange = (e) => {
    setFormData((pre) => {
      return { ...pre, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("movietoken");
      console.log(token)
      if (!token) {
        toast({
          title: "Login First",
          description: "Not Authorized",
          status: "error",
          position: "top",
          duration: 2000,
          isClosable: true,
        });
        return;
      }

      const response = await axios.post(
        "https://moviesserver.onrender.com/movies/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response);
    } catch (err) {
      toast({
        title: "Something went wrong 😔",
        description: `${err.response.data.message}`,
        status: "error",
        position: "top",
        duration: 2000,
        isClosable: true,
      });
      console.error(err);
    }
  };

  return (
    <DiV>
      <div style={{ width: "100%", margin: "auto", paddingTop: "30px" }}>
        {/* <form action=""> */}

        <h1 id="h1" style={{ color: "white" }}>
          Welcome to Admin Portal
        </h1>
      </div>

      <div
        className={`${styles.FullProductsPage}`}
        style={{ gridTemplateColumns: "32% 68%" }}
      >
        <div className={`${styles.ProductsPageSideBar}`}>
          <Filter className="filters">
            <h2 id="h2">Add a movie</h2>
            <form action="" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="image"
                name="images"
                onChange={handelChange}
              />
              <input
                type="text"
                placeholder="Name"
                name="name"
                onChange={handelChange}
              />
              <input
                type="text"
                placeholder="Audience Score"
                name="score"
                onChange={handelChange}
              />
              <input
                type="text"
                placeholder="time"
                name="time"
                onChange={handelChange}
              />
              <input
                type="text"
                placeholder="year"
                name="year"
                onChange={handelChange}
              />
              <input
                type="text"
                placeholder="Description"
                name="description"
                onChange={handelChange}
              />
              <label htmlFor="genre"></label>
              <select id="genre" name="category" onChange={handelChange}>
                <option value="">Choose movie genre</option>
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre}
                  </option>
                ))}
              </select>

              <select id="rating" name="rating" onChange={handelChange}>
                <option value="">Choose rating</option>
                {ratingOptions.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
          </Filter>
        </div>
        <Div className={`${styles.ProductsPage}`}>
          {filterData ? (
            <div
              className={`${styles.PostsCardContainer} cardcontainer`}
              style={{ gridTemplateColumns: "repeat(4,1fr)" }}
            >
              {filterData.map((el) => {
                return <PostCard key={el._id} {...el} />;
              })}
            </div>
          ) : (
            <CircularProgress isIndeterminate color="green.300" />
          )}
        </Div>
      </div>
    </DiV>
  );
};

export default Profile;
const DiV = styled.div`
  /* border: 10px solid red; */
  display: flex;

  flex-direction: column;
  input {
    width: 500px padding;
  }

  #h1 {
    font-size: 2.5rem;
    font-weight: 800;
  }
  h2 {
    font-size: 2rem;
    color: white;
    font-weight: 800;
  }
  @media (max-width: 400px) {
    #h1 {
      font-size: 1.5rem;
    }
    #h2 {
      font-size: 1.5rem;
    }
  }
`;
const Filter = styled.div`
  /* border: 5px solid white; */
  padding-top: 50px;
  display: grid;
  background-color: #ffffff79;
  padding: 50px;
  @media (max-width: 600px) {
    padding: 10px;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  form > button {
    background-color: #6b21ff;
    color: #ffffff;
    height: 40px;
    margin-top: 10px;
  }
  input {
    margin: 2px;
    padding: 5px;
  }
  select {
    margin: 15px;
    padding: 5px;
  }
  select {
    width: 100%;
    margin: auto;
  }
  grid-template-columns: repeat(1, 1fr);
  label {
    font-size: 20px;
    font-weight: 800;
  }
  @media (max-width: 400px) {
    .search {
      width: 80%;
    }
    label {
      display: none;
    }
    select {
      margin-bottom: 10px;
      width: 80%;
    }
    align-items: center;
  }
`;

const Div = styled.div`
  /* border: 5px solid orange; */
  margin: auto;
  /* border: 10px solid red; */
  background-color: #a97dff;
  /* background-color: black; */
  color: white;
  color: #171819;
  .cardContainer {
    grid-template-columns: repeat(4, 1fr);
  }
  #ProductpageTitle {
    width: 70%;
    justify-content: center;
    /* border-top: 1px solid #e4c59066; */
    font-family: "Tangerine", cursive;
    font-size: 4rem;
    font-weight: 100;
    padding-top: 50px;
    padding-bottom: 30px;
    margin: auto;
  }
  #ProductpageTitle > h1 {
    margin: auto;
    justify-content: center;
  }
  a {
    color: #e4c590;
    font-size: 30px;
    text-decoration: none;
  }
  #anchor {
    width: 20%;
    justify-content: space-evenly;
    display: flex;
    margin: auto;
    align-items: center;
    padding-bottom: 20px;
  }

  #postButton {
    width: 70%;
    color: #e4c590c2;
    height: 7rem;
    background-color: #e4c59027;
    font-size: 2.5rem;
    font-family: "Tangerine", cursive;
    outline: none;
    border: none;
    border-radius: 5px;
    border: 2px solid #e4c5908f;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  #postButton:hover {
    height: 7rem;
    background-color: transparent;
    border: 2px solid #e4c5908f;
  }
  i {
    width: 2rem;
  }

  #PostIcons {
    width: 100%;
    display: flex;
    border-top: 1px solid #e4c590c2;
    padding-top: 10px;
    justify-content: space-around;
  }

  .filters {
    display: grid;
    border: 1px solid red;
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 1300px) {
    #ProductpageTitle {
      font-size: 4rem;
    }
    #anchor {
      width: 40%;
      justify-content: space-around;
    }
    a {
      color: #e4c590;

      text-decoration: none;
    }
    width: 100%;
  }

  @media (max-width: 400px) {
    #ProductpageTitle {
      font-size: 2.5rem;
    }
    #anchor {
      width: 40%;
      justify-content: space-around;
    }
    a {
      color: #e4c590;
      font-size: 20px;
      text-decoration: none;
    }
  }
`;
