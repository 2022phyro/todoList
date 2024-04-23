export default function Icon ({name, className, ...props}) {
	return (
		<span className={`material-symbols-outlined icon ${className}`} {...props}>
		{name}
		</span>
	)
}
