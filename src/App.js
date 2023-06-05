import Quiz from "./components/Quiz";

function App() {
  const questions = [
    {
      question: 'Đâu là môn thể thao vua',
      options: ['Quần vợt', 'Bóng chuyền', 'Cầu lông', 'Bóng đá'],
      correctAnswer: 'Bóng đá',
    },
    {
      question: 'Cà phê Trung Nguyên do ai sáng lập ?',
      options: ['Phạm Nhật Vượng', 'Đặng Lê Nguyên Vũ', 'Lê Hoàng Diệp Thảo', 'Phạm Văn Mách'],
      correctAnswer: 'Đặng Lê Nguyên Vũ',
    },
    {
      question: 'Thủ đô Việt Nam là?',
      options: ['Đà Nẵng', 'Huế', 'Hà Nội', 'Hồ Chi Minh'],
      correctAnswer: 'Hà Nội',
    },
  ];
  return (
    <div className="bg-blue-900 py-10 px-2" style={{height: '100vh', backgroundColor: '#1e1e2e'}}>
      <Quiz questions={questions} />
    </div>
  );
}

export default App;
