const AnswerModel = require('../models/answer');
const QuestionModel = require('../models/question');

class AnswerService {
	static async create({ content, author, question }) {
		let new_answer;
		try {
			new_answer = new AnswerModel({ content, author, question });
			await new_answer.save();
			let update_question = await QuestionModel.findOne({_id: question});
			update_question.answers.push(new_answer._id);
			await update_question.save();
		} catch (error) {
			throw new Error('Cannot create new answer.');
		}
		return new_answer;
	}
	// static async deleteAnswer(answer_id) {
	// 	let answer;
	// 	try {
	// 		answer = await AnswerModel.get
	// 	} catch (error) {
	// 		throw new Error('Cannot create new answer.');
	// 	}
	// 	return new_answer;
	// }
	static async getByQuestionId(question_id) {
		let answers;
		try {
			answers = await AnswerModel.find({ question: question_id }).lean().exec();
		} catch (error) {
			throw new Error('Cannot get answers for this question.');
		}
		return answers;
	}
	static async likeAnswer(answer_id, user_id, type) {
		let answer;
		let vote='none';
		try {
			answer = await AnswerModel.findOne({ _id: answer_id }).exec();
			if (answer){
				let like_index;
				let is_like = false;
				let is_dislike = false;
				for (like_index=0;like_index<answer.rating_detail.like_users.length;like_index++){
					if (answer.rating_detail.like_users[like_index].toString()===user_id) {
						is_like = true;
						break;
					}
				}
				for(like_index=0;like_index<answer.rating_detail.dislike_users.length;like_index++){
					if (answer.rating_detail.dislike_users[like_index].toString()===user_id){
						is_dislike = true;
						break;
					}
				}
				if (parseInt(type, 10) === 1) {
					if (!is_like && !is_dislike) {
						vote = 'like';
						answer.rating_detail.like_users.push(user_id);
						answer.save();
					} else if (is_like) {
						vote = 'none';
						answer.rating_detail.like_users.pull(user_id);
						answer.save();
					} else if (is_dislike) {
						vote = 'like';
						answer.rating_detail.dislike_users.pull(user_id);
						answer.rating_detail.like_users.push(user_id);
						answer.save();
					}
				} else {
					if(!is_like&&!is_dislike){
						vote = 'dislike';
						answer.rating_detail.dislike_users.push(user_id);
						answer.save();
					}
					else if(is_like){
						vote='dislike';
						answer.rating_detail.dislike_users.push(user_id);
						answer.rating_detail.like_users.pull(user_id);
						answer.save();
					}
					else if(is_dislike){
						vote='none';
						answer.rating_detail.dislike_users.pull(user_id);
						answer.save();
					}
				}
			}
			else{
				throw new Error('Threr is no answer.');
			}
		} catch (error) {
			throw new Error('You can not rate.');
		}
		return {totalLike: answer.rating_detail.like_users.length, totalDislike: answer.rating_detail.dislike_users.length,vote: vote};
	}
}

module.exports = AnswerService;
