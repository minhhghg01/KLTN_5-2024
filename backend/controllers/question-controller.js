const question = require("../models/questionSchema.js");

const questionCreate = async (req, res) => {
  const questions = [
    {
      "content": "Giả sử một gen được cấu tạo từ 3 loại nuclêôtit: A, T, G thì trên mạch gốc của gen này có thể có tối đa bao nhiêu loại mã bộ ba?",
      "options": [
        "6 loại mã bộ ba.",
        "3 loại mã bộ ba.",
        "27 loại mã bộ ba.",
        "9 loại mã bộ ba."
      ],
      "option_correct": 2,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Ở sinh vật nhân thực, trình tự nuclêôtit trong vùng mã hóa của gen nhưng không mã hóa axit amin được gọi là:",
      "options": [
        "đoạn intron.",
        "đoạn êxôn.",
        "gen phân mảnh.",
        "vùng vận hành."
      ],
      "option_correct": 0,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Vùng điều hoà là vùng",
      "options": [
        "quy định trình tự sắp xếp các axit amin trong phân tử prôtêin",
        "mang tín hiệu khởi động và kiểm soát quá trình phiên mã",
        "mang thông tin mã hoá các axit amin",
        "mang tín hiệu kết thúc phiên mã"
      ],
      "option_correct": 1,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Trong 64 bộ ba mã di truyền, có 3 bộ ba không mã hoá cho axit amin nào. Các bộ ba đó là:",
      "options": [
        "UGU, UAA, UAG",
        "UUG, UGA, UAG",
        "UAG, UAA, UGA",
        "UUG, UAA, UGA"
      ],
      "option_correct": 2,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Trong quá trình nhân đôi ADN, vì sao trên mỗi chạc tái bản có một mạch được tổng hợp liên tục còn mạch kia được tổng hợp gián đoạn?",
      "options": [
        "Vì enzim ADN polimeraza chỉ tổng hợp mạch mới theo chiều 5’→3’.",
        "Vì enzim ADN polimeraza chỉ tác dụng lên một mạch.",
        "Vì enzim ADN polimeraza chỉ tác dụng lên mạch khuôn 3’→5’.",
        "Vì enzim ADN polimeraza chỉ tác dụng lên mạch khuôn 5’→3’."
      ],
      "option_correct": 0,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Mã di truyền có tính đặc hiệu, tức là",
      "options": [
        "tất cả các loài đều dùng chung một bộ mã di truyền.",
        "mã mở đầu là AUG, mã kết thúc là UAA, UAG, UGA.",
        "nhiều bộ ba cùng xác định một axit amin.",
        "một bộ ba mã hoá chỉ mã hoá cho một loại axit amin."
      ],
      "option_correct": 3,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Tất cả các loài sinh vật đều có chung một bộ mã di truyền, trừ một vài ngoại lệ, điều này biểu hiện đặc điểm gì của mã di truyền?",
      "options": [
        "Mã di truyền có tính đặc hiệu.",
        "Mã di truyền có tính thoái hóa.",
        "Mã di truyền có tính phổ biến.",
        "Mã di truyền luôn là mã bộ ba."
      ],
      "option_correct": 2,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Gen không phân mảnh có",
      "options": [
        "cả exôn và intrôn.",
        "vùng mã hoá không liên tục.",
        "vùng mã hoá liên tục.",
        "các đoạn intrôn."
      ],
      "option_correct": 2,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Một đoạn của phân tử ADN mang thông tin mã hoá cho một chuỗi pôlipeptit hay một phân tử ARN được gọi là:",
      "options": [
        "codon.",
        "gen.",
        "anticodon.",
        "mã di truyền."
      ],
      "option_correct": 1,
      "subject": "664ce762bde2b60fea829a92"
    },
    {
      "content": "Quá trình nhân đôi ADN được thực hiện theo nguyên tắc gì?",
      "options": [
        "Hai mạch được tổng hợp theo nguyên tắc bổ sung song song liên tục.",
        "Một mạch được tổng hợp gián đoạn, một mạch được tổng hợp liên tục.",
        "Nguyên tắc bổ sung và nguyên tắc bán bảo toàn.",
        "Mạch liên tục hướng vào, mạch gián đoạn hướng ra chạc ba tái bản."
      ],
      "option_correct": 2,
      "subject": "664ce762bde2b60fea829a92"
    }
  ]
  

  //   const { content, options, option_correct } = req.body;

  for (let i = 0; i < questions.length; i++) {
    const content = questions[i].content;
    const options = questions[i].options;
    const option_correct = questions[i].option_correct;
    await question.create({ content, options, option_correct });
  }
  //   await question.create({content, options, option_correct});
  return res.send({ message: "ok", success: true });
};

const questionUpdate = async (req, res) => {
  const questions = await question.find();
  for (let i = 30; i < questions.length; i++) {
    const id = questions[i]._id;
    const update = { subject: "664ce762bde2b60fea829a92" };
    await question.findByIdAndUpdate(id, update, { new: true });
  }
  return res.send({message: "ok", success: true});
};

const questionRead = async (req, res) => {};

const questionDelete = async (req, res) => {};

module.exports = {
  questionCreate,
  questionUpdate,
  questionRead,
  questionDelete,
};
