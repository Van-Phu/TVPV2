import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
<Router>
  <div>
    <div style={{ display: 'flex', gap: '10px', height: '50px' }}>
      <Link to="/">Login</Link>
      <Link to="/Colors">Colors</Link>
      <Link to="/Counter">Counter</Link>
      <Link to="/StudentInfo">StudentInfo</Link>
    </div>
    <div className="main-content" style={{ display: 'flex', height: '300px' }}>
      <Routes>
        <Route path="/" element={<Empty />} />
        <Route path="/Colors" element={<ColorChanger />} />
        <Route path="/counter" element={<MyCounter />} />
        <Route path="/StudentInfo" element={<Empty />} />
      </Routes>
    </div>
  </div>
</Router>