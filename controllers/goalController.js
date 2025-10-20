import Goal from "../model/Goal.js";


export const buatTujuan = async (req, res) => {
  try {
    const { goal, targetDate, completed } = req.body;
    const newGoal = await Goal.create({ goal, targetDate, completed });
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};


export const lihatSemuaTujuan = async (req, res) => {
  try {
    const data = await Goal.find();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: err.message });
  }
};


export const updateTujuan = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Goal.findByIdAndUpdate(id, req.body, { new: true });
    res.json(update);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};


export const hapusTujuan = async (req, res) => {
  try {
    const { id } = req.params;
    await Goal.findByIdAndDelete(id);
    res.json({ message: "Tujuan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
};