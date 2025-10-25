import Goal from "../model/Goal.js";


export const buatTujuan = async (req, res) => {
  try {
    const { goal, targetDate, completed } = req.body;
    const newGoal = new Goal({
      goal,
      targetDate,
      completed,
      userId: req.user.id, 
    });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (err) {
    res.status(500).json({ messsage: error.message });
  }
};  


export const lihatSemuaTujuan = async (req, res) => {
  try {
    const data = await Goal.find({userId : req.user.id});
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTujuan = async (req, res) => {
  try {
    const { id } = req.params;
    const update = await Goal.findOneAndUpdate(
      {_id : id, userId : req.user.id},
         req.body, 
         { new: true });
    if (!update) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.json(update);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const hapusTujuan = async (req, res) => {
  try {
    const { id } = req.params;
    const hapus = await Goal.findOneAndDelete({_id : id, userId: req.user.id});
     if (!hapus) return res.status(404).json({ msg: "Data tidak ditemukan" });
    res.json({ message: "Tujuan berhasil dihapus" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};