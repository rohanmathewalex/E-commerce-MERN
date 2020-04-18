import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
import Axios from "axios";
const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
  { key: 1, value: "Africa" },
  { key: 2, value: "Europe" },
  { key: 3, value: "Asia" },
  { key: 4, value: "North America" },
  { key: 5, value: "South America" },
  { key: 6, value: "Australia" },
  { key: 7, value: "Antarctica" },
];

function UploadProductPage(props) {
  //Title Input change
  const [TitleValue, setTitleValue] = useState("");
  const onTitleChange = (event) => {
    setTitleValue(event.currentTarget.value);
  };

  //Description Input change
  const [DescriptionValue, setDescriptionValue] = useState("");
  const onDescriptionChange = (event) => {
    setDescriptionValue(event.currentTarget.value);
  };

  //Price Input change
  const [PriceValue, setPriceValue] = useState(0);
  const onPriceChange = (event) => {
    setPriceValue(event.currentTarget.value);
  };

  //Continent Input change
  const [ContinentValue, setContinentValue] = useState(1);
  const onContinentSelectChange = (event) => {
    setContinentValue(event.currentTarget.value);
  };

  //here keep information about the uploaded images
  const [Images, setImages] = useState([]);
  //update Images
  const updateImages = (newImages) => {
    //console.log(newImages);
    setImages(newImages);
  };
  //on submit
  const onSubmit = (event) => {
    event.preventDefault();

    if (
      !TitleValue ||
      !DescriptionValue ||
      !PriceValue ||
      !ContinentValue ||
      !Images
    ) {
      return alert("fill all the Fields first!.");
    }
    const variables = {
      writer: props.user.userData._id,
      title: TitleValue,
      description: DescriptionValue,
      price: PriceValue,
      images: Images,
      continents: ContinentValue,
    };

    Axios.post("/api/product/uploadProduct", variables).then((response) => {
      if (response.data.success) {
        alert("Product Successfully Uploaded.");
        props.history.push("/");
      } else {
        alert("Failed to Upload Product");
      }
    });
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>

      <Form onSubmit={onSubmit}>
        {/*DropZone */}

        <FileUpload refreshFunction={updateImages} />

        <br />
        <br />
        <label>Title</label>
        <Input onChange={onTitleChange} value={TitleValue} />
        <br />
        <br />
        <label>Description</label>
        <TextArea onChange={onDescriptionChange} value={DescriptionValue} />
        <br />
        <br />
        <label>Price($)</label>
        <Input onChange={onPriceChange} value={PriceValue} type="number" />
        <select onChange={onContinentSelectChange}>
          {Continents.map((item) => (
            <option key={item.key} value={item.key}>
              {item.value}
            </option>
          ))}
        </select>
        <br />
        <br />
        <Button onClick={onSubmit}>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
