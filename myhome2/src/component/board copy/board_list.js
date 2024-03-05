function BoardList() {
	return (
		<div className="container" style={{"marginTop":"20px"}}>
			<h2>게시판 목록</h2>

			<div className="input-group mb-3" style={{"marginTop":"20px"}}>
				<button
					type="button"
					className="btn btn-primary dropdown-toggle"
					data-bs-toggle="dropdown"
				>
					선택하세요
				</button>
				<ul className="dropdown-menu">
					<li>
						<a className="dropdown-item" href="#">
							제목
						</a>
					</li>
					<li>
						<a className="dropdown-item" href="#">
							내용
						</a>
					</li>
					<li>
						<a className="dropdown-item" href="#">
							제목+내용
						</a>
					</li>
				</ul>
				<input type="text" className="form-control" placeholder="Search" />
				<button className="btn btn-secondary" type="submit">
					Go
				</button>
			</div>

			<table className="table table-hover ">
				<thead className="table-secondary">
					<tr>
						<th>Firstname</th>
						<th>Lastname</th>
						<th>Email</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>John</td>
						<td>Doe</td>
						<td>john@example.com</td>
					</tr>
					<tr>
						<td>Mary</td>
						<td>Moe</td>
						<td>mary@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr>
					<tr>
						<td>July</td>
						<td>Dooley</td>
						<td>july@example.com</td>
					</tr>
				</tbody>
			</table>

			<ul className="pagination  justify-content-center">
				<li className="page-item disabled">
					<a className="page-link" href="#">
						first
					</a>
				</li>
				<li className="page-item disabled">
					<a className="page-link" href="#">
						Previous
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						1
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						2
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						3
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						4
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						5
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						Next
					</a>
				</li>
				<li className="page-item">
					<a className="page-link" href="#">
						last
					</a>
				</li>
			</ul>

			<div className="container mt-3" style={{"textAlign":"right"}}>
				<a href="#" className="btn btn-secondary">
					Link Button
				</a>
				<button type="button" className="btn btn-secondary">
					Button
				</button>
				<input
					type="button"
					className="btn btn-secondary"
					value="Input Button"
				/>
				<input
					type="submit"
					className="btn btn-secondary"
					value="Submit Button"
				/>
				<input
					type="reset"
					className="btn btn-secondary"
					value="Reset Button"
				/>
			</div>
		</div>
	);
}

export default BoardList;
