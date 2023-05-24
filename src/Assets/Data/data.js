import { about1, about2 } from "../../Constant/ImagePath";
import {
  anasImg,
  danialImg,
  AhmedImg,
  mansoorImg,
  tabishImg,
} from "../../Constant/ImagePath";

export const aboutSectionData = [
  {
    id: "1",
    img: about1,
    heading: `What is Learnify`,
    content: `
  Welcome to Learnify.com, a web-based application designed to connect struggling students with tutors from the Institute of Business Administration (IBA) community. Our platform was created with the aim of addressing the problems faced by students who find themselves struggling with specific courses in the IBA curriculum. We understand that while the IBA has a lot of practices and policies to maintain the quality of education, there is always room for improvement.
  
  We acknowledge that not all students can grasp the concepts taught in class, and some may require individual attention to achieve a better understanding of the course material. Seeking help from Teaching Assistants (TAs) or online tutorials may not always be the best solution, as students may require specific, personalized attention to tackle their individual needs.
  
  Learnify.com is designed to bridge this gap by connecting IBA students who are struggling with their courses with a community of tutors, including current students and alumni.`,
  },
  {
    id: "2",
    img: about2,
    heading: `What do we Offer`,
    content: `We offer a wide range of courses, including Design Analysis and Algorithm, among others. Students can filter their search based on specific criteria such as availability, price, and course material. This enables them to find the right tutor who can cater to their individual needs.

  Our platform allows students to book individual sessions with tutors or subscribe to a set number of monthly classes. At the end of each session, students are encouraged to give a rating of their experience, which helps tutors build a strong profile and enhance their teaching abilities.
  
  Learnify.com is designed to support IBA students in their academic pursuits, providing them with the resources they need to succeed. We are committed to creating a community of learners who are invested in each other's success, and we believe that together, we can create a better education system.`,
  },
];

export const aboutTeamData = [
  {
    id: "1",
    name: `Anas Tahir`,
    img: anasImg,
    classOf: `Class of 2023`,
    qualification: `BSCS IBA`,
    description: `Hi, I'm Anas Tahir. I was the Project Head and Product Manager for Learnify.com. My job was to make the best use of
    our team's skills to create a good product and plan the whole system and document every thing including problem Statement to software infrastructure/design. I also played a key role in connecting the technical and non-technical stakeholders of the project.`,
  },
  {
    id: "2",
    name: `Ahmed Asif`,
    img: AhmedImg,
    classOf: `Class of 2023`,
    qualification: `BSCS IBA`,
    description: `Hi, I'm Ahmed Asif. I was the Frontend Developer for Learnify.com. My main task was to create a user-friendly and visually 
    appealing interface for our platform. I accomplished this using React JS, a powerful JavaScript library, ensuring our
    users have a seamless and engaging experience when using our service.`,
  },
  {
    id: "3",
    name: `Syed Danyal Ahmed`,
    img: danialImg,
    classOf: `Class of 2023`,
    qualification: `BSCS IBA`,
    description: `
    Hello, I'm Syed Danyal Ahmed. I also served as a Frontend Developer for Learnify.com, alongside Ahmed Asif. Using React JS, 
    we collaborated to build an intuitive, user-friendly interface that enhances our users' experience, making their learning 
    journey smoother and more effective.`,
  },
  {
    id: "4",
    name: `Mansoor Ahmed`,
    img: mansoorImg,
    classOf: `Class of 2023`,
    qualification: `BSCS IBA`,
    description: `
    Hi, I'm Mansoor. As the Backend Developer for Learnify.com, my primary role was to ensure the smooth operation of our 
    platform. I utilized Node.js to create a robust and efficient backend, which supports the functionality of our user-friendly
    interface and enables us to deliver a seamless service to our users.`,
  },
  {
    id: "5",
    name: `Tabish`,
    img: tabishImg,
    classOf: `Class of 2023`,
    qualification: `BSCS IBA`,
    description: `Hi, I'm Tabish. I worked with Mansoor as a Backend Developer for Learnify.com. We used Node.js and MongoDB 
    to make sure our website works well and keeps all our data safe. Our work helps users have a better experience on our platform.`,
  },
];
