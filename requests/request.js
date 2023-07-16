const express = require('express');

const app = express();
app.use(express.json());
const user = ['chinmay', 'akshay', 'abhay', 'vikas'];

app.get('/user', (req, res) => {
    return res.json(user);
})

app.get('/:id', (req, res) => {
    const { id } = req.params;
    let userFound = false;
    for (let i = 0; i < user.length; i++) {
        console.log(user[i]);
        if (i == id) {
            userFound = true;
            res.send(user[i]);
            break; // Exit the loop once the user is found
        }
    }
    if (!userFound) {
        res.send('No user found');
    }
});

app.post('/user', (req, res) => {
    const { userName } = req.body;
  
    if (!userName) {
        res.json('Enter a name to add');
    } else {
        let userExists = false;
        for (const a of user) {
            if (a === userName) {
                userExists = true;
                break;
            }
        }
      
        if (userExists) {
            res.json('User already exists');
        } else {
            user.push(userName);
            res.json(user);
        }
    }
});

app.put('/user/:id', (req,res) => {
    const {id} = req.params;
    const updatedUserData = req.body;
    if (id >= 0 && id < user.length) {
        user[id] = updatedUserData;
        res.json({message : "User Updated"});
    } else {
        res.json({message : "User Not Updated" });
    } 
})

app.delete('/user/:id', (req,res) => {
    const {id} = req.params;
    if (id >= 0 && id < user.length) {
        user.splice(id, 1);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
})

app.listen(3000, () => {
    console.log(`server running on 3000`)
})