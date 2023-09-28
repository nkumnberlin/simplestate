function B() {
  const count = { count: 's' };
  console.log('i read as a child', count);
  return <p>count is {count.count}</p>;
}

export default B;
