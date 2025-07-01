import items from "@/data";


export default function handler(req, res) {
  const { id } = req.query;
  const item = items.find(item => item.id === parseInt(id));

  if (item) {
    res.status(200).json(item);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
}
