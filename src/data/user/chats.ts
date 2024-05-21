"use server";
import { createSupabaseUserServerActionClient } from "@/supabase-clients/user/createSupabaseUserServerActionClient";
import { createSupabaseUserServerComponentClient } from "@/supabase-clients/user/createSupabaseUserServerComponentClient";
import type { Table, ValidSAPayload } from "@/types";
import { serverGetLoggedInUser } from "@/utils/server/serverGetLoggedInUser";
import type { Message } from "ai";
import { revalidatePath } from "next/cache";

export const insertChat = async (
	projectId: string,
	payload: Message[],
	chatId: string,
): Promise<ValidSAPayload<Table<"chats">>> => {
	const supabase = createSupabaseUserServerActionClient();
	const user = await serverGetLoggedInUser();

	const { data, error } = await supabase
		.from("chats")
		.upsert(
			{
				id: chatId,
				project_id: projectId,
				user_id: user.id,
				payload: JSON.stringify({messages: payload}),
			},
			{ onConflict: "id" },
		)
		.select("*")
		.single();

	if (error) {
		return {
			status: "error",
			message: error.message,
		};
	}

	revalidatePath("/project/[projectSlug]", "layout")

	return {
		status: "success",
		data: data,
	};
};

export const getChatById = async (chatId: string): Promise<Table<"chats">> => {
	const supabase = createSupabaseUserServerComponentClient();
	const { data, error } = await supabase
		.from("chats")
		.select("*")
		.eq("id", chatId)
		.single();

	if (error) {
		throw error;
	}

	console.log

	return data;
};

export const deleteChat = async (chatId: string): Promise<void> => {
	const supabase = createSupabaseUserServerActionClient();
	const { error } = await supabase.from("chats").delete().eq("id", chatId);

	if (error) {
		throw error;
	}
};

export const getChats = async (userId: string): Promise<Table<"chats">[]> => {
	const supabase = createSupabaseUserServerComponentClient();
	const { data, error } = await supabase
		.from("chats")
		.select("*")
		.eq("user_id", userId)
		.order("created_at", { ascending: false });

	if (error) {
		throw error;
	}

	return data;
};

export const getChatsHistory = async (projectId: string, userId: string): Promise<Table<"chats">[]> => {
	const supabase = createSupabaseUserServerComponentClient();
	const { data, error } = await supabase
		.from("chats")
		.select("*")
		.eq("project_id", projectId)
		.eq("user_id", userId)

	if (error) {
		throw error;
	}

	return data;
};

