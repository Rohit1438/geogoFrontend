import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from "axios";
import { color,colorScheme, useToast } from '@chakra-ui/react';

const PostCard = (Data) => {
  const { images, name, year,card, category, _id, comment, like } = Data;
  // console.log(Data);

  const [saved, setSaved] = useState(false);
  const [liked, setLiked] = useState(like.includes(_id));
  const [Like,setLike]=useState(like.length)
  const [data, setData] = useState({ ...Data });

  const storedData = localStorage.getItem("spicy_hall");
  let existingData = storedData ? JSON.parse(storedData) : [];

  const toast = useToast();
  const Url = "https://spicy-hall.onrender.com/recipes";

  const check = (id) => {
    existingData.forEach((el) => {
      if (el._id === id) {
        console.log(true);
        setSaved(true);
      }
    });
  };

  useEffect(() => {
    check(_id);
  }, [data,Like]);

  const handelSave = async () => {
    const isProductDuplicate = existingData.some((product) => product._id === _id);
    const newData = { ...data };

    if (!isProductDuplicate) {
      existingData.push(newData);
      localStorage.setItem("spicy_hall", JSON.stringify(existingData));
      setSaved(true);
      toast({
        title: 'Saved',
        description: 'Product has been added to saved.',
        status: 'success',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    } else {
      existingData = existingData.filter((product) => product._id !== _id);
      localStorage.setItem("spicy_hall", JSON.stringify(existingData));
      setSaved(false);
      toast({
        title: 'Removed',
        description: 'Product has been removed from saved.',
        status: 'error',
        position: 'top',
        duration: 2000,
        isClosable: true,
      });
    }
  };




  if (comment) {
    return (
      <CardBox className="CardBox">
        <div className="Cardimage">
          <img src={images} alt="" />
        </div>
        <div className="CardDetails">
          <h1>{name}</h1> 
           <h2 style={{fontWeight:"800",fontSize:"1.2rem"}}>{year?.substring(0, 10)}</h2>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",width:"100%"}}>
          <h2>{category?.substring(0, 10)}</h2>
        
          <Link style={{ alignItems: "center" }} id="Link" to={`/movies/${_id}`}>
              <i  style={{ color: "#913dff" }} class="fa-solid fa-arrow-right">Go</i>
            </Link>
          </div>
          


          <div className="LikeSection">
  

          </div>
        </div>
      </CardBox>
    );
  }
};



export default PostCard;

const CardBox = styled.div`
color: #0a0a0a;
/* border: 1px solid #e4c590c5; */
display:flex;
flex-direction: column;
padding: 10px;
width: 90%;
height: 100%;
margin: auto;
justify-content: space-between;
/* border: 1px solid #ffffffc2; */
box-shadow: rgba(255, 255, 255, 0.1) 0px 1px 2px 0px;
max-height: 80vh;
border-radius: 2px;
box-shadow: rgba(0, 0, 0, 0.332) 1.95px 1.95px 2.6px;
  background-color: rgb(255, 255, 255);
  .black-star {
  color: black;
}
#loveCon>h2{
  font-size: 20px;
  text-align: left;
}
#loveCon{
  align-items: center;
}
#white {
  color: white;
  background-color: white;
}
#Black{
  color: black;
}
  #saved{
    color: white;

  }
  i{
    color: white;
  }
.Cardimage>img{
border-radius: 15px;
width: 100%;

}
.CardDetails{
  border-radius: 15px;
  padding: 15px;
  
;

  justify-content: center; 
    align-items: center;
    text-align: left;

}
h1{
  font-size: 1.2rem;
  font-weight: 800;
  /* color: white; */
}
.CardDetails>h2{
  text-align: justify;
  margin: auto;
  font-weight:bolder;
}
button {
  background-color: #E4C590;
  height: 50px;
  width: 50px; /* Set the width to the same value as the height */
  font-size: 20px;
  border-radius: 50px;
  padding: 10px;
  color: black;
}

#Link{
  color:#000000;
  

  font-size: 25px;

}
Link:hover{
  font-size: 16px;
}
.LikeSection{

  display: flex;
  justify-content: space-between;

}

@media (max-width: 1100px) {


  display: flex;
  flex-direction: column;

h1{
  text-align: center;
  margin: 10px;
}
}








@media (max-width: 600px) {

padding: 15px;


h1{
  font-size: 1rem;
}
/* margin: 20px; */


.Cardimage>img{
  height: 250px;
}
.LikeSection{
  margin-top: .5rem;
}

#loveCon>h2{
  font-size: 25px;
}

}


`;
