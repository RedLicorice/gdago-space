<!-- spine ruler (desktop only) -->
<div class="spine" aria-hidden="true">
	<span>GDAGO.SPACE</span>
	<span>SHEET 01/01</span>
</div>

<style>
	.spine {
		position: fixed;
		left: 14px;
		top: 0;
		bottom: 0;
		width: 18px;
		display: none;
		flex-direction: column;
		justify-content: space-between;
		padding-block: 40px;
		pointer-events: none;
		z-index: 0;
	}
	.spine span {
		writing-mode: vertical-rl;
		font-family: 'Spline Sans Mono', monospace;
		font-size: 0.65rem;
		letter-spacing: 0.1em;
		color: var(--line-strong);
	}
	@media (min-width: 1200px) {
		.spine {
			display: flex;
		}
	}
</style>
