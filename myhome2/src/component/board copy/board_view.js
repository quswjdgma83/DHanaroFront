function BoardView() {
	return (
		<div className="container" style={{"marginTop":"20px"}}>
			<h2>게시판 상세보기</h2>

			<table className="table table-hover " style={{"marginTop":"30px"}}>
				<tbody>
					<tr className="table-secondary">
						<th>제목</th>
						<td colspan="5">부트스트랩을 배워봅시다</td>
					</tr>
					<tr>
						<th>작성자</th>
						<td>홍길동</td>
						<th>작성일</th>
						<td>2021-12-27</td>
						<th>조회수</th>
						<td>12</td>
					</tr>
					<tr>
						<th colspan="6" className="table-secondary">
							내용
						</th>
					</tr>
					<tr>
						<td colspan="6">
							내용을 써봅시다
							<br />
							내용을 써봅시다
							<br />
							내용을 써봅시다
							<br />
							내용을 써봅시다
							<br />
							내용을 써봅시다
							<br />
							내용을 써봅시다
							<br />
							내용을 써봅시다
							<br />
						</td>
					</tr>
				</tbody>
			</table>

			<div className="container mt-3" style={{"textAlign":"right"}}>
				<a href="#" className="btn btn-secondary">
					Link Button
				</a>
				<button type="button" className="btn btn-secondary">
					Button
				</button>
				<input type="button" className="btn btn-secondary" value="Input Button" />
				<input type="submit" className="btn btn-secondary" value="Submit Button" />
				<input type="reset" className="btn btn-secondary" value="Reset Button" />
			</div>
		</div>
	);
}

export default BoardView;
