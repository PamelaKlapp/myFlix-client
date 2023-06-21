import React from "react";
import { Form } from "react-bootstrap";

export function UpdateUser ({handleSubmit, handleUpdate}) {
    return (
        <div>
        <h2>Update your Info</h2>
        <Form>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" defaultValue={user.Username} onChange={e => handleUpdate(e)} required placeholder="Enter new username"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" defaultValue={user.Password} onChange={e => handleUpdate(e)} required placeholder="Enter new password"/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" defaultValue={user.Email} onChange={e => handleUpdate(e)} required placeholder="Enter new email"/>
            </Form.Group>
            <Button variant="primary" type="submit" >Update</Button>
        </Form>
        </div>
    )
}