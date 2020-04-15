import React, { useState } from "react";
import { Typography, Button, Form, message, Input, Icon } from "antd";
import FileUpload from "../../utils/FileUpload";
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

function UploadProductPage() {
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
    setImages(newImages);
  };

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title level={2}>Upload Travel Product</Title>
      </div>

      <Form onSubmit>
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
        <Button>Submit</Button>
      </Form>
    </div>
  );
}

export default UploadProductPage;
