export async function Log(stack, level, packageName, message) {
    try {
        const response = await fetch("http://20.244.56.144/evaluation-service/logs", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                stack,
                level,
                package: packageName,
                message
            })
        });
        return await response.json();
    } catch (error) {
        console.error("Logging failed:", error);
    }
}
