import './Notes.css'
import Icon from './Icon'
export default function Notes () {
	return (
		<div className="notes-wrapper">
		  <div className="notes-body">
			<input type="text"/>
			<div class="notes-date-group">
				<h2><Icon name="stat_0"/>Friday, March 16 2024</h2>
				<ul>
					<li>
						<h3>Fix the car</h3>
						<p>I have to fix the car before it turns into something else by tomorrow</p>
					</li>
					<li>
						<h3>Fix the car</h3>
						<p>I have to fix the car before it turns into something else by tomorrow</p>
					</li>
					<li>
						<h3>Go to the gym</h3>
						<p>I have to fix the car before it turns into something else by tomorrow</p>
					</li>
				</ul>
			</div>
			<div class="notes-date-group">
				<h2><Icon name="stat_0"/>Monday, January 2 2022</h2>
				<ul>
					<li>
						<h3>Fix the car</h3>
						<p>I have to fix the car before it turns into something else by tomorrow</p>
					</li>
					<li>
						<h3>Fix the car</h3>
						<p>I have to fix the car before it turns into something else by tomorrow</p>
					</li>
					<li>
						<h3>Go to the gym</h3>
						<p>I have to fix the car before it turns into something else by tomorrow</p>
					</li>
				</ul>
			</div>

		</div>
		</div>
	)
    
}
