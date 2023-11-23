import { images } from '../constants';

export const getCommentsData = async () => {
    return [
      {
        _id: "10",
        user: {
          _id: "a",
          name: "Thế Nghĩa DevOps",
          image: images.nghiaAvt,
        },
        desc: "it was a nice post, Thank you!",
        post: "1",
        parent: null,
        replyOnUser: null,
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
      {
        _id: "11",
        user: {
          _id: "b",
          name: "Athur Conan Doyle",
          image: images.AvtUserPost
        },
        desc: "A reply for TheNghia",
        post: "1",
        parent: "10",
        replyOnUser: "a",
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
      {
        _id: "12",
        user: {
          _id: "b",
          name: "Bạch Lộc - 白鹿",
          image: images.bailuAvt,
        },
        desc: "keep it up bro <3",
        post: "1",
        parent: null,
        replyOnUser: null,
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
      {
        _id: "13",
        user: {
          _id: "c",
          name: "Lalisa Manobal",
          image: images.lisaAvt,
        },
        desc: "I'm always interested in your content :)",
        post: "1",
        parent: null,
        replyOnUser: null,
        createdAt: "2022-12-31T17:22:05.092+0000",
      },
    ];
  };