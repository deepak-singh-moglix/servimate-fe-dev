import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Modal, Button, Form } from 'react-bootstrap'
import { addTopPick } from '../../redux/actions/homeScreen'
import Loader from "../Loader";


const TopPickModal = ({topPickModal,setTopPickModal}) => {
    const [title, setTitle] = useState("")
    const [picture, setPicture] = useState("")
    const dispatch = useDispatch();
    const { loader } = useSelector(store=> store.homeScreenRoot)

    const imagehandler = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            setPicture(img);
        }
    };
    const formHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("title", title);
        if (picture !== "") {
            formData.append("picture", picture);
        }
        dispatch(addTopPick(formData, () => {
            setTitle("")
            setTopPickModal(false)
        }));
    }
    return (
        <div>
        <Modal
        show={topPickModal}
        onHide={() => setTopPickModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>TOP PICK</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formHandler}>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Picture</Form.Label>
              <Form.Control
                accept=".jpg,.png,.jpeg"
                onChange={imagehandler}
                type="file"
              />
            </Form.Group>
            {loader ? (
              <Loader />
            ) : (
              <Button variant="primary" type="submit">
                Add
              </Button>
            )}
          </Form>
        </Modal.Body>
      </Modal>
        </div>
    )
}

export default TopPickModal
