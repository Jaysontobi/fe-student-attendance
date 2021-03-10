import React, { useState, useEffect } from 'react';
import userService from './userService';
import gradesService from '../grade/gradesService';
import quarterService from '../quarter/quarterService'
import { Button} from 'antd';
import moment from 'moment';
const UserAction = (initial = { searchRequest: {} }) => {
  let [userDetails, setUserDetails] = useState( {list : [],credentials: []});
  let [adminList, setAdminList] = useState([])
  let [quarter, setQuarter] = useState({_id : 0, quarter: 0})
  let [parentList, setParentList] = useState([])
  let [studentList, setStudentList] = useState([])
  let [teacherList, setTeacherList] = useState([])
  let [showUserVisible, setShowUserVisible] = useState(false);
  let [selectedUser, setSelectedUser] = useState({});
  let [selectedParent, setSelectedParent] = useState([]);

  let [loginCounter, setLoginCounter] = useState(false);

  const addUser = async values => {
    let auditTrailObj = {
      user: JSON.parse(sessionStorage.user),
      activity : "Add User",
      date:new Date()
    }
    if(values.parentId){
      let parent = await userService.findyById(values.parentId)
      values.parent = parent.data;
    }
    let response = await userService.add(values)
    .then(function (res) {
      if(values.role === "Student"){
        let gradeObj = {
          status: true,
          student: values,
          gradeLevel: values.gradeLevel,
          section: values.section,
          schoolYear : values.schoolYear,
          subjects: [{
              subjectName: "English",
              subjectGrade: {
                firstQuarter: 0,
                secondQuarter: 0,
                thirdQuarter: 0,
                fourthQuarter: 0
            }
          },
          {
            schoolYear : values.schoolYear,
              subjectName: "Filipino",
              subjectGrade: {
                firstQuarter: 0,
                secondQuarter: 0,
                thirdQuarter: 0,
                fourthQuarter: 0
            }
          },
          {
            schoolYear : values.schoolYear,
              subjectName: "Science",
                subjectGrade: {
                firstQuarter: 0,
                secondQuarter: 0,
                thirdQuarter: 0,
                fourthQuarter: 0
            }
          },
          {
            schoolYear : values.schoolYear,
              subjectName: "Math",
                subjectGrade: {
                firstQuarter: 0,
                secondQuarter: 0,
                thirdQuarter: 0,
                fourthQuarter: 0
            }
          },
          {
            schoolYear : values.schoolYear,
              subjectName: "MAPEH",
                subjectGrade: {
                firstQuarter: 0,
                secondQuarter: 0,
                thirdQuarter: 0,
                fourthQuarter: 0
            }
          },
          {
            schoolYear : values.schoolYear,
              subjectName: "Values",
                subjectGrade: {
                firstQuarter: 0,
                secondQuarter: 0,
                thirdQuarter: 0,
                fourthQuarter: 0
            }
          }]
      }
      let response = gradesService.add(gradeObj)
      }
    
        
        setSelectedUser({
            firstName: "",
            lastName: "",
            middleName: "",
            employeeNumber: "",
            department: "",
          })
        setShowUserVisible(false)
        loadUsers()
        window.location.reload(false);
    })
  };

  const editUser = async values => {
    let auditTrailObj = {
      user: JSON.parse(sessionStorage.user),
      activity : "Edit User",
      date:new Date()}
    if(values.parentId){
      let parent = await userService.findyById(values.parentId)
      values.parent = parent.data;
    }
    let response = await userService.update(values)
    .then(function (res) {
        setSelectedUser({
          firstName: "",
          lastName: "",
          middleName: "",
          idNumber: "",
          gender: "",
          birthDate: "",
          birthPlace: "",
          age: "",
          contactNumber: "",
          email: "",
          status: "",
          })
        setShowUserVisible(false)
        loadUsers()
    })
  };

  const getListOfParent = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Parent");
    setSelectedParent(result)
  };

  const showUser = () => {
    setSelectedUser({
        firstName: "",
        lastName: "",
        middleName: "",
        idNumber: "",
        gender: "",
        birthDate: "",
        birthPlace: "",
        age: "",
        contactNumber: "",
        email: "",
        status: "",
      });
    setShowUserVisible(true)
  };

  const loadUser = (userObj) => {
    setSelectedUser({...userObj});
    setShowUserVisible(true);
  };

  const loadQuarter = async () => {
    let response = await quarterService.findAllQuarter();
    setQuarter({quarter: response.data[0].quarter , _id: response.data[0]._id})
  }

  const login = (credentials) => {
    let ctr = 0;
    let loggedInUser = {};
    userDetails.list.map((user) => {
        if(user.idNumber === credentials.username && user.password === credentials.password) {
            ctr = ctr + 1;
            loggedInUser = user;
        }
    })
    if(ctr === 0) {
        setLoginCounter(false)
    } else {
        sessionStorage.setItem("user", JSON.stringify(loggedInUser));
        sessionStorage.setItem("quarter", quarter.quarter)
        sessionStorage.setItem("_id", quarter._id)
        window.location.reload(false);
        setLoginCounter(true)
    }
  };

  const filterStudent = async (name) => {
    if(name !== "") {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.idNumber === name && user.role === "Student");
      let newArray = result.map((user) => {
        return {
          key: user._id,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          idNumber: user.idNumber,
          gender: user.gender,
          birthDate: user.birthDate,
          birthPlace: user.birthPlace,
          age: user.age,
          contactNumber: user.contactNumber,
          email: user.email,
          role: user.role,
          password: user.password,
          gradeLevel: user.gradeLevel,
          section: user.section,
          action: 
            <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
        }
      })
  
      let newArrayCredentials = response.data.map((user) => {
          return {
            key: user._id,
            id: user._id,
            idNumber: user.idNumber,
            password: user.password,
          }
        })
  
        setStudentList(newArray)
    } else {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.role === "Student");
      let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setStudentList( newArray)
    }
  } 
  
  const filterTeacher = async (name) => {
    if(name !== "") {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.idNumber === name && user.role === "Teacher");
      let newArray = result.map((user) => {
        return {
          key: user._id,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          idNumber: user.idNumber,
          gender: user.gender,
          birthDate: user.birthDate,
          birthPlace: user.birthPlace,
          age: user.age,
          contactNumber: user.contactNumber,
          email: user.email,
          role: user.role,
          password: user.password,
          gradeLevel: user.gradeLevel,
          section: user.section,
          action: 
            <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
        }
      })
  
      let newArrayCredentials = response.data.map((user) => {
          return {
            key: user._id,
            id: user._id,
            idNumber: user.idNumber,
            password: user.password,
          }
        })
  
        setTeacherList(newArray)
    } else {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.role === "Teacher");
      let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setTeacherList( newArray)
    }
  }  

  const filterParent = async (name) => {
    if(name !== "") {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.idNumber === name && user.role === "Parent");
      let newArray = result.map((user) => {
        return {
          key: user._id,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          idNumber: user.idNumber,
          gender: user.gender,
          birthDate: user.birthDate,
          birthPlace: user.birthPlace,
          age: user.age,
          contactNumber: user.contactNumber,
          email: user.email,
          role: user.role,
          password: user.password,
          gradeLevel: user.gradeLevel,
          section: user.section,
          action: 
            <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
        }
      })
  
      let newArrayCredentials = response.data.map((user) => {
          return {
            key: user._id,
            id: user._id,
            idNumber: user.idNumber,
            password: user.password,
          }
        })
  
        setParentList(newArray)
    } else {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.role === "Parent");
      let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setParentList( newArray)
    }
  }  

  const filterAdmin = async (name) => {
    if(name !== "") {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.idNumber === name && user.role === "Admin");
      let newArray = result.map((user) => {
        return {
          key: user._id,
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          middleName: user.middleName,
          idNumber: user.idNumber,
          gender: user.gender,
          birthDate: user.birthDate,
          birthPlace: user.birthPlace,
          age: user.age,
          contactNumber: user.contactNumber,
          email: user.email,
          role: user.role,
          password: user.password,
          gradeLevel: user.gradeLevel,
          section: user.section,
          action: 
            <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
        }
      })
  
      let newArrayCredentials = response.data.map((user) => {
          return {
            key: user._id,
            id: user._id,
            idNumber: user.idNumber,
            password: user.password,
          }
        })
  
        setAdminList(
        newArray
      )
    } else {
      let response = await userService.findAllUser();
      let result = response.data.filter(user => user.role === "Admin");
      let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setAdminList(
      newArray
    )
    }
  }

  const loadTeacher = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Teacher");
    let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setTeacherList(newArray)

  }  

  const loadStudent = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Student");
    let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setStudentList(newArray)

  }  

  const loadParent = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Parent");
    let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setParentList(newArray)

  }

  const loadAdmin = async () => {
    let response = await userService.findAllUser();
    let result = response.data.filter(user => user.role === "Admin");
    let newArray = result.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    setAdminList(newArray)

  }

const loadUsers = async () => {
    let response = await userService.findAllUser();
    let newArray = response.data.map((user) => {
      return {
        key: user._id,
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        middleName: user.middleName,
        idNumber: user.idNumber,
        gender: user.gender,
        birthDate: user.birthDate,
        birthPlace: user.birthPlace,
        age: user.age,
        contactNumber: user.contactNumber,
        email: user.email,
        role: user.role,
        password: user.password,
        gradeLevel: user.gradeLevel,
        section: user.section,
        action: 
          <Button onClick={() => loadUser(user)} key={"VIEW_"+user._id}>View User&nbsp; </Button>,
      }
    })

    let newArrayCredentials = response.data.map((user) => {
        return {
          key: user._id,
          id: user._id,
          idNumber: user.idNumber,
          password: user.password,
        }
      })

    setUserDetails({
      list: newArray,
      credentials: newArrayCredentials
    })

  }

  useEffect(() => {
    loadUsers();
    getListOfParent();
    loadAdmin();
    loadStudent();
    loadTeacher();
    loadParent();
    loadQuarter();
  }, []);


  return {
    loadUsers,
    addUser,
    loginCounter,
    showUserVisible,
    setShowUserVisible,
    showUser,
    userDetails,
    selectedUser,
    editUser,
    login,
    selectedParent,
    filterAdmin,
    filterStudent,
    filterParent,
    filterTeacher,
    adminList,
    studentList,
    parentList,
    teacherList,
  }
};

export default UserAction;